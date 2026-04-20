'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';

/**
 * Hook for accessing auth state and actions.
 * Initializes auth on first use.
 */
export function useAuth() {
  const store = useAuthStore();

  useEffect(() => {
    if (store.isLoading && !store.user) {
      store.initialize();
    }
  }, []);

  return store;
}
