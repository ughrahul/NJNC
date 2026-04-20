'use client';

import { useState } from 'react';
import { CONFERENCE, DELEGATE_CATEGORIES } from '@njnc/utils';

const steps = ['Personal Info', 'Category', 'Payment', 'Confirmation'];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: '', specialty: '', designation: '', institution: '',
    category: '', workshopInterest: false, cmeCertificate: true,
    paymentMethod: 'BANK_TRANSFER',
  });

  const update = (field: string, value: string | boolean) => setForm({ ...form, [field]: value });

  return (
    <div className="pt-24 pb-20 bg-snow min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 pt-10">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">Join Us</span>
          <h1 className="font-display text-display-2 text-navy mt-3 mb-2">Register for NJNC 2028</h1>
          <p className="text-slate">September 18–19, 2028 · Hotel Radisson Blu, Kathmandu</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-xs text-slate mt-1 hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          {/* Step 1: Personal */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-display text-display-4 text-navy">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Dr. John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Country *</label>
                  <input type="text" value={form.country} onChange={(e) => update('country', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Japan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Medical Specialty *</label>
                  <input type="text" value={form.specialty} onChange={(e) => update('specialty', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Neurology" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Designation</label>
                  <input type="text" value={form.designation} onChange={(e) => update('designation', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="MD, PhD" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Institution / Hospital *</label>
                <input type="text" value={form.institution} onChange={(e) => update('institution', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Tokyo Medical University" />
              </div>
            </div>
          )}

          {/* Step 2: Category */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-display-4 text-navy">Delegate Category</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {DELEGATE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => update('category', cat.value)}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      form.category === cat.value ? 'border-primary bg-primary-50 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-display font-bold text-navy text-sm">{cat.label}</div>
                    <div className="text-xs text-slate mt-1">
                      {cat.value === 'INTERNATIONAL' ? '$300' : cat.value === 'SAARC' ? '$150' : cat.value === 'NATIONAL' ? 'NPR (See QR)' : '$75'}
                    </div>
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-3 text-sm text-navy">
                <input type="checkbox" checked={form.cmeCertificate} onChange={(e) => update('cmeCertificate', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                I require a CME certificate
              </label>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-display-4 text-navy">Payment Information</h2>

              {form.category === 'NATIONAL' ? (
                <div className="bg-gold-50 rounded-xl p-6 border border-gold-200 text-center">
                  <h3 className="font-display font-bold text-navy mb-3">📱 Scan QR to Pay</h3>
                  <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gold">
                    <span className="text-4xl">📲</span>
                  </div>
                  <p className="text-sm text-slate">Scan the QR code with your banking app to complete payment.</p>
                </div>
              ) : (
                <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
                  <h3 className="font-display font-bold text-navy mb-3">🏦 Bank Transfer Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-navy">Account Holder:</strong> <span className="text-slate">{CONFERENCE.bankDetails.accountHolder}</span></p>
                    <p><strong className="text-navy">Account Number:</strong> <span className="text-slate font-mono">{CONFERENCE.bankDetails.accountNumber}</span></p>
                    <p><strong className="text-navy">SWIFT Code:</strong> <span className="text-slate font-mono">{CONFERENCE.bankDetails.swiftCode}</span></p>
                    <p><strong className="text-navy">Bank:</strong> <span className="text-slate">{CONFERENCE.bankDetails.bankName}</span></p>
                    <p><strong className="text-navy">Location:</strong> <span className="text-slate">{CONFERENCE.bankDetails.location}</span></p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Upload Payment Proof *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <span className="text-3xl mb-2 block">📄</span>
                  <p className="text-sm text-slate">Click to upload your payment receipt or screenshot</p>
                  <p className="text-xs text-slate mt-1">PDF, JPG, PNG — Max 5MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✅</span>
              </div>
              <h2 className="font-display text-display-3 text-navy mb-3">Registration Submitted!</h2>
              <p className="text-slate max-w-md mx-auto mb-6">
                Thank you for registering for NJNC 2028. Your registration is pending payment verification.
                You will receive a confirmation email shortly.
              </p>
              <div className="bg-snow rounded-xl p-6 border inline-block text-left">
                <p className="text-sm"><strong className="text-navy">Name:</strong> <span className="text-slate">{form.fullName || 'Dr. John Smith'}</span></p>
                <p className="text-sm"><strong className="text-navy">Email:</strong> <span className="text-slate">{form.email || 'john@example.com'}</span></p>
                <p className="text-sm"><strong className="text-navy">Category:</strong> <span className="text-slate">{form.category || 'International'}</span></p>
                <p className="text-sm"><strong className="text-navy">Status:</strong> <span className="text-gold font-semibold">Pending verification</span></p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 0 && step < 3 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-lg border text-sm font-medium text-slate hover:bg-gray-50 transition-colors">
                ← Back
              </button>
            ) : <div />}
            {step < 3 && (
              <button onClick={() => setStep(step + 1)} className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                {step === 2 ? 'Submit Registration' : 'Continue →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
