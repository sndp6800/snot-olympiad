import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    ...options
  }).format(new Date(date));
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export function truncate(str: string, length = 100) {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    active: 'badge-green', completed: 'badge-green',
    pending: 'badge-amber', fee_pending: 'badge-amber', in_transit: 'badge-amber',
    suspended: 'badge-red', failed: 'badge-red',
    new: 'badge-blue', registered: 'badge-blue',
  };
  return map[status] || 'badge-purple';
}

export const API_ROUTES = {
  auth:     { login: '/auth/login', register: '/auth/register', me: '/auth/me', logout: '/auth/logout' },
  schools:  '/schools',
  students: '/students',
  payments: '/payments',
  contact:  '/contact',
  blog:     '/blog',
};
