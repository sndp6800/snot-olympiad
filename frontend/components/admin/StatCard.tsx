import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  color?: 'indigo' | 'green' | 'amber' | 'red';
}

const colors = {
  indigo: { bg: 'bg-primary-50 dark:bg-primary-950', icon: 'text-primary-600 dark:text-primary-400', badge: 'bg-primary-100 dark:bg-primary-900/40' },
  green:  { bg: 'bg-emerald-50 dark:bg-emerald-950', icon: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 dark:bg-emerald-900/40' },
  amber:  { bg: 'bg-amber-50 dark:bg-amber-950',     icon: 'text-amber-600 dark:text-amber-400',     badge: 'bg-amber-100 dark:bg-amber-900/40' },
  red:    { bg: 'bg-red-50 dark:bg-red-950',         icon: 'text-red-600 dark:text-red-400',         badge: 'bg-red-100 dark:bg-red-900/40' },
};

export default function StatCard({ label, value, icon: Icon, change, changeType = 'neutral', color = 'indigo' }: StatCardProps) {
  const c = colors[color];
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', c.bg)}>
          <Icon className={cn('text-xl', c.icon)} />
        </div>
        {change && (
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', c.badge,
            changeType === 'up' ? 'text-emerald-700 dark:text-emerald-400' :
            changeType === 'down' ? 'text-red-600 dark:text-red-400' :
            'text-gray-500 dark:text-gray-400'
          )}>
            {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
