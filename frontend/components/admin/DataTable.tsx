'use client';
import { cn } from '@/lib/utils';

interface Column<T> { key: keyof T | string; label: string; render?: (row: T) => React.ReactNode; className?: string; }
interface DataTableProps<T> { columns: Column<T>[]; data: T[]; loading?: boolean; emptyMessage?: string; }

export default function DataTable<T extends { _id?: string }>({ columns, data, loading, emptyMessage = 'No data found' }: DataTableProps<T>) {
  if (loading) return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="animate-pulse">
        <div className="h-11 bg-gray-50 dark:bg-gray-800" />
        {[...Array(5)].map((_, i) => <div key={i} className="h-14 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900" />)}
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {columns.map(col => (
                <th key={String(col.key)} className={cn('px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider', col.className)}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {data.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-gray-400">{emptyMessage}</td></tr>
            ) : data.map((row, i) => (
              <tr key={row._id || i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                {columns.map(col => (
                  <td key={String(col.key)} className={cn('px-4 py-3.5 text-gray-700 dark:text-gray-300', col.className)}>
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
