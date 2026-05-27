'use client';
import Badge from '@/components/ui/Badge';

const kits = [
  { city: 'Mumbai',    state: 'Maharashtra', kits: 312, status: 'delivered',  trackingId: 'TRK001234' },
  { city: 'Delhi',     state: 'Delhi',       kits: 280, status: 'delivered',  trackingId: 'TRK001235' },
  { city: 'Jaipur',    state: 'Rajasthan',   kits: 72,  status: 'in_transit', trackingId: 'TRK001236' },
  { city: 'Lucknow',   state: 'Uttar Pradesh', kits: 148, status: 'in_transit', trackingId: 'TRK001237' },
  { city: 'Ahmedabad', state: 'Gujarat',     kits: 92,  status: 'pending',    trackingId: null },
  { city: 'Bhopal',    state: 'Madhya Pradesh', kits: 72, status: 'pending',  trackingId: null },
  { city: 'Kolkata',   state: 'West Bengal', kits: 168, status: 'delivered',  trackingId: 'TRK001238' },
  { city: 'Hyderabad', state: 'Telangana',   kits: 120, status: 'delivered',  trackingId: 'TRK001239' },
];

export default function LogisticsPage() {
  const delivered  = kits.filter(k => k.status === 'delivered').reduce((a, k) => a + k.kits, 0);
  const inTransit  = kits.filter(k => k.status === 'in_transit').reduce((a, k) => a + k.kits, 0);
  const pending    = kits.filter(k => k.status === 'pending').reduce((a, k) => a + k.kits, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>Logistics & Dispatch</h1>
        <p className="text-sm text-gray-500 mt-1">Track exam kit delivery across all cities</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Delivered', value: delivered, color: 'text-emerald-600' },
          { label: 'In Transit', value: inTransit, color: 'text-amber-600' },
          { label: 'Pending Dispatch', value: pending, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="card p-5 text-center">
            <div className={`text-3xl font-bold mb-1 ${s.color}`} style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
            <div className="text-sm text-gray-500">{s.label} kits</div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">City-wise Dispatch Status</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {['City', 'State', 'Kits', 'Tracking ID', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {kits.map(k => (
              <tr key={k.city} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{k.city}</td>
                <td className="px-4 py-3 text-gray-500">{k.state}</td>
                <td className="px-4 py-3 font-bold">{k.kits}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{k.trackingId || '—'}</td>
                <td className="px-4 py-3">
                  <Badge label={k.status.replace('_', ' ')} variant={k.status === 'delivered' ? 'green' : k.status === 'in_transit' ? 'amber' : 'red'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
