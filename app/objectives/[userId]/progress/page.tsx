'use client';

import { styleString } from '@/app/style';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function ProgressCurrentObjectivePage() {
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `/api/objectives/${userId}/current/progress`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        },
      );

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
        throw new Error(
          (data as { message: string }).message ||
            'Error updating objective progress',
        );
      }

      setMessage('Progress logged successfully!');
      setTimeout(() => router.push(`/objectives/${userId}/current`), 1000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{styleString}</style>

      <div className="page-wrap">
        <div className="content">
          {/* Header */}
          <div className="eyebrow">Reading Objectives Tracker</div>

          <h1>
            Update objective
            <br />
            <em>progress</em>.
          </h1>

          <p className="subtitle">
            Log one read article towards your current objective.
          </p>

          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
            {message && <p style={{ color: '#51cf66' }}>{message}</p>}

            <button type="submit" className="primary" disabled={loading}>
              {loading ? 'Logging...' : 'Log Progress'}
            </button>
          </form>

          {/* Footer */}
          <div className="footer">
            <span>
              Reading Objectives v1 -{' '}
              <a
                href="https://github.com/JasonMejane/daily-dev-reading-objectives"
                target="_blank"
                rel="noopener noreferrer"
              >
                See on GitHub
              </a>
            </span>
            <span>Jason Mejane</span>
          </div>
        </div>
      </div>
    </>
  );
}
