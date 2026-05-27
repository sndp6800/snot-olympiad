'use client';
import { useEffect, useState } from 'react';
import StatCard from '@/components/admin/StatCard';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/ui/Badge';
import api from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { HiAcademicCap, HiUsers, HiCreditCard, HiTruck } from 'react-icons/hi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ schools: 0, students: 0, revenue: 0, dispatched: 0 });
  const [recentSchools, setRecentSchools] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [schoolRes, studentRes, paymentRes] = await Promise.all([
          api.get('/schools?limit=5'),
          api.get('/students/stats'),
          api.get('/payments?limit=5'),
        ]);
        setStats({
          schools:    schoolRes.data.pagination?.total || 0,
          students:   studentRes.data.data?.total || 0,
          revenue:    paymentRes.data.data?.reduce((a: number, p: any) => p._id === 'completed' ? a + p.total : a, 0) || 0,
          dispatched: 0,
        });
        setRecentSchools(schoolRes.data.data || []);
        setRecentPayments(paymentRes.data.data || []);
      } catch {
        // Use demo data if API not available
        setStats({ schools: 1248, students: 84320, revenue: 4260000, dispatched: 936 });
        setRecentSchools([
          { _id: '1', name: 'Delhi Public School', address: { city: 'New Delhi', state: 'Delhi' }, status: 'active', totalStudents: 342 },
          { _id: '2', name: 'Kendriya Vidyalaya', address: { city: 'Mumbai', state: 'Maharashtra' }, status: 'active', totalStudents: 280 },
          { _id: '3', name: 'Ryan Public School', address: { city: 'Pune', state: 'Maharashtra' }, status: 'pending', totalStudents: 190 },
          { _id: '4', name: 'DAV Public School', address: { city: 'Chandigarh', state: 'Punjab' }, status: 'active', totalStudents: 215 },
          { _id: '5', name: "St. Xavier's", address: { city: 'Kolkata', state: 'West Bengal' }, status: 'fee_pending', totalStudents: 168 },
        ]);
        setRecentPayments([
          { _id: '1', invoiceNumber: 'SNOT-INV-202605-0001', school: { name: 'Delhi Public School' }, amount: 68400, status: 'completed', method: 'upi', createdAt: new Date().toISOString() },
          { _id: '2', invoiceNumber: 'SNOT-INV-202605-0002', school: { name: 'Kendriya Vidyalaya' }, amount: 48000, status: 'completed', method: 'netbanking', createdAt: new Date().toISOString() },
          { _id: '3', invoiceNumber: 'SNOT-INV-202605-0003', school: { name: 'Ryan Public School' }, amount: 38000, status: 'pending', method: 'cheque', createdAt: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const schoolColumns = [
    { key: 'name', label: 'School', render: (r: any) => <span className="font-medium text-gray-900 dark:text-white">{r.name}</span> },
    { key: 'city', label: 'City', render: (r: any) => `${r.address?.city}, ${r.address?.state}` },
    { key: 'totalStudents', label: 'Students', render: (r: any) => <span className="font-semibold">{r.totalStudents}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <Badge label={r.status?.replace('_', ' ')} variant={r.status === 'active' ? 'green' : r.status === 'pending' ? 'amber' : 'red'} /> },
  ];

  const paymentColumns = [
    { key: 'invoiceNumber', label: 'Invoice', render: (r: any) => <span className="font-mono text-xs">{r.invoiceNumber}</span> },
    { key: 'school', label: 'School', render: (r: any) => r.school?.name || '—' },
    { key: 'amount', label: 'Amount', render: (r: any) => <span className="font-semibold">{formatCurrency(r.amount)}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <Badge label={r.status} variant={r.status === 'completed' ? 'green' : r.status === 'pending' ? 'amber' : 'red'} /> },
    { key: 'createdAt', label: 'Date', render: (r: any) => formatDate(r.createdAt) },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard label="Total Schools" value={stats.schools.toLocaleString('en-IN')} icon={HiAcademicCap} change="+34 this week" changeType="up" color="indigo" />
        <StatCard label="Students Registered" value={stats.students.toLocaleString('en-IN')} icon={HiUsers} change="+1,204 today" changeType="up" color="green" />
        <StatCard label="Fees Collected" value={formatCurrency(stats.revenue)} icon={HiCreditCard} change="₹3.1L today" changeType="up" color="amber" />
        <StatCard label="Kits Dispatched" value={stats.dispatched.toLocaleString('en-IN')} icon={HiTruck} change="312 pending" changeType="down" color="red" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Schools</h2>
          </div>
          <DataTable columns={schoolColumns} data={recentSchools} loading={loading} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Payments</h2>
          </div>
          <DataTable columns={paymentColumns} data={recentPayments} loading={loading} />
        </div>
      </div>
    </div>
  );
}
