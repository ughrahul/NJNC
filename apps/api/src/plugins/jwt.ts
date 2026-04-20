import jwt from 'jsonwebtoken';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    jwt: {
      sign(payload: JwtPayload): string;
      verify(token: string): JwtPayload;
      signPasswordReset(email: string): string;
      verifyPasswordReset(token: string): { email: string };
    };
  }
}

async function jwtPlugin(fastify: FastifyInstance) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  const accessExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';

  const jwtHelper = {
    /**
     * Sign an access token (15min expiry as per spec §12.1).
     */
    sign(payload: JwtPayload): string {
      return jwt.sign(payload, secret, {
        expiresIn: accessExpiry,
        issuer: 'njnc2028-api',
        audience: 'njnc2028-web',
      });
    },

    /**
     * Verify and decode an access token.
     */
    verify(token: string): JwtPayload {
      const decoded = jwt.verify(token, secret, {
        issuer: 'njnc2028-api',
        audience: 'njnc2028-web',
      }) as JwtPayload & jwt.JwtPayload;

      return {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
    },

    /**
     * Sign a password reset token (1 hour expiry as per spec §12.4).
     */
    signPasswordReset(email: string): string {
      return jwt.sign({ email, purpose: 'password-reset' }, secret, {
        expiresIn: '1h',
        issuer: 'njnc2028-api',
      });
    },

    /**
     * Verify a password reset token.
     */
    verifyPasswordReset(token: string): { email: string } {
      const decoded = jwt.verify(token, secret, {
        issuer: 'njnc2028-api',
      }) as { email: string; purpose: string };

      if (decoded.purpose !== 'password-reset') {
        throw new Error('Invalid token purpose');
      }

      return { email: decoded.email };
    },
  };

  fastify.decorate('jwt', jwtHelper);
}

export default fp(jwtPlugin, { name: 'jwt' });
