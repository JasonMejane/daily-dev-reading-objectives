'use client';

import { useRouter, useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ChallengeLevel } from '@/lib/types/objectives';
import { styleString } from '@/app/style';

export default function CreateObjectivePage() {
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

    const formData = new FormData(e.currentTarget);
    const payload = {
      objective: formData.get('objective'),
      tag: formData.get('tag'),
      challengeLevel: formData.get('challengeLevel'),
      timeFrame: formData.get('timeFrame') || undefined,
    };

    try {
      const response = await fetch(`/api/objectives/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
        throw new Error(
          (data as { message: string }).message || 'Error creating objective',
        );
      }

      setMessage('Objective created successfully!');
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
            Set a new
            <br />
            <em>objective</em>.
          </h1>

          <p className="subtitle">
            Your next reading goal awaits — define it, pursue it, and keep the
            momentum going.
          </p>

          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <div>
              <label htmlFor="objective">Objective Title *</label>
              <input
                id="objective"
                name="objective"
                type="text"
                required
                placeholder="Enter objective title"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>

            <div>
              <label htmlFor="tag">Tag *</label>
              <input
                id="tag"
                name="tag"
                type="text"
                required
                placeholder="e.g., ai-security, productivity"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </div>

            <div>
              <label>Challenge Level *</label>
              <div
                style={{
                  marginTop: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <label>
                  <input
                    type="radio"
                    name="challengeLevel"
                    value={ChallengeLevel.EASY}
                  />{' '}
                  Easy (3 articles in one week, 10 articles in one month, 50
                  articles in one year)
                </label>
                <label>
                  <input
                    type="radio"
                    name="challengeLevel"
                    value={ChallengeLevel.MEDIUM}
                    defaultChecked
                  />{' '}
                  Medium (6 articles in one week, 20 articles in one month, 100
                  articles in one year)
                </label>
                <label>
                  <input
                    type="radio"
                    name="challengeLevel"
                    value={ChallengeLevel.HARD}
                  />{' '}
                  Hard (9 articles in one week, 30 articles in one month, 150
                  articles in one year)
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="timeFrame">Time Frame</label>
              <select
                id="timeFrame"
                name="timeFrame"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              >
                <option value="">None</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>

            {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
            {message && <p style={{ color: '#51cf66' }}>{message}</p>}

            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                className="secondary"
                type="button"
                onClick={() => router.push(`/`)}
                disabled={loading}
                style={{ padding: '8px 16px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                className="primary"
                type="submit"
                disabled={loading}
                style={{ padding: '8px 16px', cursor: 'pointer' }}
              >
                {loading ? 'Creating...' : 'Create Objective'}
              </button>
            </div>
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
