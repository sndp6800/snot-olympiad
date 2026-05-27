import { cn } from '@/lib/utils';

interface LoadingSpinnerProps { size?: 'sm' | 'md' | 'lg'; className?: string; fullPage?: boolean; }

export default function LoadingSpinner({ size = 'md', className, fullPage }: LoadingSpinnerProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const spinner = (
    <div className={cn('border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin', sizes[size], className)} />
  );
  if (fullPage) return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        {spinner}
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
  return spinner;
}
