'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import api from '@/lib/api';
import { formatDate, truncate } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Badge from '@/components/ui/Badge';

const categoryColor: Record<string, any> = { Results: 'green', Announcements: 'blue', Tips: 'amber', News: 'purple', Events: 'red' };

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/blog${category ? `?category=${category}` : ''}`);
        setPosts(data.data);
      } catch {
        // Use fallback data if API not available
        setPosts([
          { _id: '1', title: 'SNOT 2025 Results Announced', excerpt: 'We are thrilled to announce the results of the SNOT 2025 Olympiad. Over 80,000 students participated this year.', category: 'Results', publishedAt: new Date().toISOString(), author: { name: 'SNOT Team' } },
          { _id: '2', title: 'Registration Open for 2026 Olympiad', excerpt: 'Schools can now register for the 2026 edition. Early registration discounts available till March 31.', category: 'Announcements', publishedAt: new Date().toISOString(), author: { name: 'SNOT Team' } },
          { _id: '3', title: 'Top 5 Tips to Prepare for Math Olympiad', excerpt: 'Our academic experts share proven strategies to help students excel in the Mathematics Olympiad.', category: 'Tips', publishedAt: new Date().toISOString(), author: { name: 'Academic Team' } },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category]);

  const categories = ['', 'Results', 'Announcements', 'Tips', 'News', 'Events'];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary-900 to-gray-950 py-20 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>News & Updates</h1>
          <p className="text-primary-200 text-lg max-w-xl mx-auto">Results, announcements, tips and latest news from SNOT Olympiad.</p>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                  {c || 'All'}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <article key={post._id} className="card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-2 bg-gradient-to-r from-primary-500 to-accent-500" />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge label={post.category} variant={categoryColor[post.category] || 'gray'} />
                        <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{truncate(post.excerpt, 120)}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-xs text-gray-400">By {post.author?.name || 'SNOT Team'}</span>
                        <Link href={`/blog/${post.slug || post._id}`} className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">Read more →</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
