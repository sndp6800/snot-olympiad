'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from 'react-icons/hi';

type FormData = { name: string; email: string; phone: string; organization: string; type: string; subject: string; message: string; };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/contact', data);
      setSubmitted(true);
      toast.success('Message sent! We will reply within 24 hours.');
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary-900 to-gray-950 py-20 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Get in Touch</h1>
          <p className="text-primary-200 text-lg max-w-xl mx-auto">Have a question or want to partner with us? We'd love to hear from you.</p>
        </section>

        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Info */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>Contact Information</h2>
                {[
                  { icon: HiMail, label: 'Email', value: 'info@snotolympiad.in' },
                  { icon: HiPhone, label: 'Phone', value: '+91 98765 43210' },
                  { icon: HiLocationMarker, label: 'Address', value: 'SNOT Headquarters, Connaught Place, New Delhi — 110001' },
                ].map(c => (
                  <div key={c.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                      <c.icon className="text-primary-600 dark:text-primary-400 text-lg" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{c.label}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{c.value}</div>
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Office Hours</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="card p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-4">
                      <HiCheckCircle className="text-3xl text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. Our team will get back to you within 24–48 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Full Name *</label>
                        <input {...register('name', { required: 'Name is required' })} placeholder="Your name" className="input-field" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="label">Email *</label>
                        <input {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} placeholder="you@example.com" type="email" className="input-field" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Phone</label>
                        <input {...register('phone')} placeholder="+91 XXXXX XXXXX" className="input-field" />
                      </div>
                      <div>
                        <label className="label">Organization</label>
                        <input {...register('organization')} placeholder="School / Company name" className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="label">Type of Query</label>
                      <select {...register('type')} className="input-field">
                        <option value="general">General Enquiry</option>
                        <option value="partnership">Partnership / Logistics</option>
                        <option value="school">School Registration</option>
                        <option value="complaint">Complaint</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Subject *</label>
                      <input {...register('subject', { required: 'Subject is required' })} placeholder="Brief subject" className="input-field" />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <label className="label">Message *</label>
                      <textarea {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'At least 20 characters' } })}
                        rows={5} placeholder="Write your message here..." className="input-field resize-none" />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3">
                      {isSubmitting ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</> : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
