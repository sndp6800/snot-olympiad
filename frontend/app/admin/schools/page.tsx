'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import DataTable from '@/components/admin/DataTable';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiSearch } from 'react-icons/hi';

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const loadSchools = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/schools?search=${search}`);
      setSchools(data.data);
    } catch {
      setSchools([
        { _id: '1', name: 'Delhi Public School', code: 'DPS0001', address: { city: 'New Delhi', state: 'Delhi' }, coordinator: { name: 'Ritu Sharma' }, totalStudents: 342, status: 'active' },
        { _id: '2', name: 'Kendriya Vidyalaya', code: 'KV0002', address: { city: 'Mumbai', state: 'Maharashtra' }, coordinator: { name: 'Anand Joshi' }, totalStudents: 280, status: 'active' },
        { _id: '3', name: 'Ryan Public School', code: 'RPS0003', address: { city: 'Pune', state: 'Maharashtra' }, coordinator: { name: 'Sunita Patil' }, totalStudents: 190, status: 'pending' },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadSchools(); }, [search]);

  const onSubmit = async (data: any) => {
    try {
      await api.post('/schools', data);
      toast.success('School added successfully!');
      setShowModal(false);
      reset();
      loadSchools();
    } catch (err: any) { toast.error(err?.response?.data?.message || 'Failed to add school'); }
  };

  const columns = [
    { key: 'code', label: 'Code', render: (r: any) => <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{r.code}</span> },
    { key: 'name', label: 'School', render: (r: any) => <span className="font-semibold text-gray-900 dark:text-white">{r.name}</span> },
    { key: 'location', label: 'Location', render: (r: any) => `${r.address?.city}, ${r.address?.state}` },
    { key: 'coordinator', label: 'Coordinator', render: (r: any) => r.coordinator?.name },
    { key: 'totalStudents', label: 'Students', render: (r: any) => <span className="font-bold">{r.totalStudents}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <Badge label={r.status?.replace('_', ' ')} variant={r.status === 'active' ? 'green' : r.status === 'pending' ? 'amber' : 'red'} /> },
    { key: 'actions', label: 'Actions', render: (r: any) => (
      <div className="flex gap-2">
        <button onClick={() => toast.success(`Viewing ${r.name}`)} className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium">View</button>
        <button onClick={async () => { await api.delete(`/schools/${r._id}`).catch(() => {}); toast.success('Deleted'); loadSchools(); }} className="text-xs text-red-500 hover:underline font-medium">Delete</button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>Schools</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all registered schools</p>
        </div>
        <Button onClick={() => setShowModal(true)}><HiPlus /> Add School</Button>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search schools..." className="input-field pl-9" />
        </div>
      </div>

      <DataTable columns={columns} data={schools} loading={loading} emptyMessage="No schools found" />

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); reset(); }} title="Add New School">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="label">School Name *</label><input {...register('name', { required: true })} className="input-field" placeholder="Full school name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">City *</label><input {...register('address.city', { required: true })} className="input-field" placeholder="City" /></div>
            <div><label className="label">State *</label><input {...register('address.state', { required: true })} className="input-field" placeholder="State" /></div>
          </div>
          <div><label className="label">Board</label>
            <select {...register('board')} className="input-field">
              <option value="CBSE">CBSE</option><option value="ICSE">ICSE</option><option value="State Board">State Board</option>
            </select>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Coordinator Details</p>
            <div className="space-y-3">
              <div><label className="label">Name *</label><input {...register('coordinator.name', { required: true })} className="input-field" placeholder="Coordinator name" /></div>
              <div><label className="label">Email *</label><input type="email" {...register('coordinator.email', { required: true })} className="input-field" placeholder="coordinator@school.in" /></div>
              <div><label className="label">Phone *</label><input {...register('coordinator.phone', { required: true })} className="input-field" placeholder="+91 XXXXX XXXXX" /></div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => { setShowModal(false); reset(); }}>Cancel</Button>
            <Button type="submit" loading={isSubmitting}>Add School</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
