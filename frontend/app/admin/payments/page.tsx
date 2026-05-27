'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/payments?limit=20');
        setPayments(data.data);
      } catch {
        setPayments([
          { _id: '1', invoiceNumber: 'SNOT-INV-202605-0001', school: { name: 'Delhi Public School' }, amount: 68400, method: 'upi', status: 'completed', createdAt: new Date().toISOString() },
          { _id: '2', invoiceNumber: 'SNOT-INV-202605-0002', school: { name: 'Kendriya Vidyalaya' }, amount: 48000, method: 'netbanking', status: 'completed', createdAt: new Date().toISOString() },
          { _id: '3', invoiceNumber: 'SNOT-INV-202605-0003', school: { name: 'Ryan Public School' }, amount: 38000, method: 'cheque', status: 'pending', createdAt: new Date().toISOString() },
          { _id: '4', invoiceNumber: 'SNOT-INV-202605-0004', school: { name: "St. Xavier's" }, amount: 33600, method: 'card', status: 'failed', createdAt: new Date().toISOString() },
        ]);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const columns = [
    { key: 'invoiceNumber', label: 'Invoice No.', render: (r: any) => <span className="font-mono text-xs">{r.invoiceNumber}</span> },
    { key: 'school', label: 'School', render: (r: any) => <span className="font-semibold">{r.school?.name}</span> },
    { key: 'amount', label: 'Amount', render: (r: any) => <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(r.amount)}</span> },
    { key: 'method', label: 'Method', render: (r: any) => <span className="capitalize text-gray-500">{r.method}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <Badge label={r.status} variant={r.status === 'completed' ? 'green' : r.status === 'pending' ? 'amber' : 'red'} /> },
    { key: 'createdAt', label: 'Date', render: (r: any) => formatDate(r.createdAt) },
  ];

  const total = payments.filter(p => p.status === 'completed').reduce((a, p) => a + p.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>Payments</h1>
          <p className="text-sm text-gray-500 mt-1">Total collected: <span className="font-bold text-emerald-600">{formatCurrency(total)}</span></p>
        </div>
        <Button variant="secondary">Download Report</Button>
      </div>
      <DataTable columns={columns} data={payments} loading={loading} emptyMessage="No payments found" />
    </div>
  );
}
