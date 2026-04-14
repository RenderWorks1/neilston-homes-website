'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().optional(),
  developmentSlug: z.string().optional(),
  developmentOfInterest: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  developmentSlug?: string;
  developmentName?: string;
  developmentOptions?: { slug: string; name: string }[];
}

export function EnquiryForm({ developmentSlug, developmentName, developmentOptions }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { developmentSlug, developmentOfInterest: developmentName ?? '' },
  });

  const onSubmit = async (data: FormValues) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-status-available/10 border border-status-available text-charcoal p-8 flex items-start gap-4">
        <CheckCircle2 className="text-status-available shrink-0 mt-1" />
        <div>
          <h3 className="font-serif italic text-copper text-2xl mb-2">Thank you</h3>
          <p>Your enquiry has been received. A member of our team will be in touch within one business day.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-1">Name</label>
        <input
          {...register('name')}
          className="w-full border border-border-grey px-4 py-3 focus:border-copper focus:outline-none"
          placeholder="Your full name"
        />
        {errors.name && <p className="text-sm text-status-sold mt-1">{errors.name.message}</p>}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-1">Phone</label>
          <input
            {...register('phone')}
            className="w-full border border-border-grey px-4 py-3 focus:border-copper focus:outline-none"
            placeholder="021 000 0000"
          />
          {errors.phone && <p className="text-sm text-status-sold mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-1">Email</label>
          <input
            {...register('email')}
            className="w-full border border-border-grey px-4 py-3 focus:border-copper focus:outline-none"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-sm text-status-sold mt-1">{errors.email.message}</p>}
        </div>
      </div>
      {developmentOptions && (
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-1">Development of Interest</label>
          <select
            {...register('developmentOfInterest')}
            className="w-full border border-border-grey px-4 py-3 focus:border-copper focus:outline-none bg-white"
            defaultValue=""
          >
            <option value="">Any / Not sure yet</option>
            {developmentOptions.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {developmentSlug && <input type="hidden" {...register('developmentSlug')} value={developmentSlug} />}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-1">Message</label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full border border-border-grey px-4 py-3 focus:border-copper focus:outline-none"
          placeholder="Tell us a little about what you're looking for…"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Sending…
          </>
        ) : (
          'Send Enquiry'
        )}
      </button>
      {status === 'error' && (
        <div className="flex items-start gap-2 text-status-sold text-sm">
          <AlertCircle size={18} /> Something went wrong. Please try again or call us directly.
        </div>
      )}
    </form>
  );
}
