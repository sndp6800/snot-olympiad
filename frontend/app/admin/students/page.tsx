'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { HiSearch } from 'react-icons/hi';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/students?search=${search}&limit=20`);
        setStudents(data.data);
      } catch {
        setStudents([
          { _id: '1', rollNumber: 'SNOT260000001', name: 'Aarav Sharma', class: '8', school: { name: 'Delhi Public School' }, subjects: ['Mathematics', 'Science'], registrationStatus: 'confirmed' },
          { _id: '2', rollNumber: 'SNOT260000002', name: 'Priya Verma', class: '10', school: { name: 'Kendriya Vidyalaya' }, subjects: ['English', 'General Knowledge'], registrationStatus: 'registered' },
          { _id: '3', rollNumber: 'SNOT260000003', name: 'Rohan Gupta', class: '6', school: { name: 'DAV Public School' }, subjects: ['Mathematics'], registrationStatus: 'confirmed' },
          { _id: '4', rollNumber: 'SNOT260000004', name: 'Sneha Patel', class: '9', school: { name: 'Ryan Public School' }, subjects: ['Science', 'Cyber'], registrationStatus: 'registered' },
        ]);
      } finally { setLoading(false); }
    };
    load();
  }, [search]);

  const columns = [
    { key: 'rollNumber', label: 'Roll No.', render: (r: any) => <span className="font-mono text-xs">{r.rollNumber}</span> },
    { key: 'name', label: 'Student', render: (r: any) => <span className="font-semibold text-gray-900 dark:text-white">{r.name}</span> },
    { key: 'class', label: 'Class', render: (r: any) => `Class ${r.class}` },
    { key: 'school', label: 'School', render: (r: any) => r.school?.name || '—' },
    { key: 'subjects', label: 'Subjects', render: (r: any) => <span className="text-xs text-gray-500">{r.subjects?.join(', ')}</span> },
    { key: 'registrationStatus', label: 'Status', render: (r: any) => <Badge label={r.registrationStatus} variant={r.registrationStatus === 'confirmed' ? 'green' : 'blue'} /> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>Students</h1>
          <p className="text-sm text-gray-500 mt-1">All enrolled students across India</p>
        </div>
        <Button variant="secondary">Export CSV</Button>
      </div>
      <div className="relative max-w-sm mb-5">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or roll number..." className="input-field pl-9" />
      </div>
      <DataTable columns={columns} data={students} loading={loading} emptyMessage="No students found" />
    </div>
  );
}
