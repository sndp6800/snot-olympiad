'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  HiHome, HiAcademicCap, HiUsers, HiCreditCard, HiTruck,
  HiChartBar, HiCog, HiLogout, HiDocumentText
} from 'react-icons/hi';

const navItems = [
  { href: '/admin',             icon: HiHome,          label: 'Overview' },
  { href: '/admin/schools',     icon: HiAcademicCap,   label: 'Schools' },
  { href: '/admin/students',    icon: HiUsers,          label: 'Students' },
  { href: '/admin/payments',    icon: HiCreditCard,     label: 'Payments' },
  { href: '/admin/logistics',   icon: HiTruck,          label: 'Logistics' },
  { href: '/admin/blog',        icon: HiDocumentText,   label: 'Blog' },
  { href: '/admin/analytics',   icon: HiChartBar,       label: 'Analytics' },
  { href: '/admin/settings',    icon: HiCog,            label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-60 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <HiAcademicCap className="text-white text-sm" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>SNOT Admin</div>
            <div className="text-[10px] text-gray-400">Control Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  active
                    ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                )}>
                <item.icon className={cn('text-lg flex-shrink-0', active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400')} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 px-2 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</div>
            <div className="text-xs text-gray-400 truncate">{user?.email}</div>
          </div>
        </div>
        <button onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all">
          <HiLogout className="text-base" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
