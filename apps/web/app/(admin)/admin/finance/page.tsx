"use client";

const pendingPayments = [
  {
    id: "PAY-001",
    name: "Dr. Sarah Chen",
    amount: "$300",
    method: "Bank Transfer",
    date: "2028-04-13",
    proof: "receipt.pdf",
  },
  {
    id: "PAY-002",
    name: "Dr. Maya Shrestha",
    amount: "NPR 15,000",
    method: "QR Payment",
    date: "2028-04-11",
    proof: "screenshot.png",
  },
  {
    id: "PAY-003",
    name: "Dr. Prem Gurung",
    amount: "$150",
    method: "Bank Transfer",
    date: "2028-04-10",
    proof: "transfer.pdf",
  },
];

const revenue = [
  { label: "International", amount: "$29,400", count: 98 },
  { label: "SAARC", amount: "$6,750", count: 45 },
  { label: "National", amount: "NPR 1,080,000", count: 72 },
  { label: "Resident/MO", amount: "$2,400", count: 32 },
];

export default function AdminFinance() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-display-4 text-navy">
        Finance & Payments
      </h2>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenue.map((r) => (
          <div
            key={r.label}
            className="bg-white rounded-xl p-5 border shadow-sm"
          >
            <div className="text-sm text-slate mb-1">{r.label}</div>
            <div className="font-display text-xl font-bold text-navy">
              {r.amount}
            </div>
            <div className="text-xs text-slate mt-1">
              {r.count} registrations
            </div>
          </div>
        ))}
      </div>

      {/* Pending Verification */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-navy">
            Pending Payment Verification
          </h3>
          <span className="text-xs bg-crimson text-white px-2 py-0.5 rounded-full">
            {pendingPayments.length} pending
          </span>
        </div>
        <div className="space-y-3">
          {pendingPayments.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium text-navy text-sm">{p.name}</div>
                <div className="text-xs text-slate">
                  {p.method} · {p.date}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-navy text-sm">
                  {p.amount}
                </span>
                <button className="text-xs px-3 py-1.5 bg-primary-50 text-primary rounded-lg hover:bg-primary-100">
                  View Proof
                </button>
                <button className="text-xs px-3 py-1.5 bg-forest text-white rounded-lg hover:bg-forest-700">
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-700">
          Export Transactions CSV
        </button>
        <button className="px-4 py-2 bg-gray-100 text-slate rounded-lg text-sm font-medium hover:bg-gray-200">
          Generate PDF Report
        </button>
      </div>
    </div>
  );
}
