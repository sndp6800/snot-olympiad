import { cn } from '@/lib/utils';

interface BadgeProps { label: string; variant?: 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'gray'; className?: string; }

export default function Badge({ label, variant = 'gray', className }: BadgeProps) {
  const variants = {
    green:  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber:  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    red:    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    blue:   'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
    gray:   'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>{label}</span>;
}
