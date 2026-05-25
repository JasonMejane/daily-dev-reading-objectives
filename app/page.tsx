'use client';

import { useState } from 'react';
import { styleString } from './style';

const PAGES = [
  {
    href: (u: string) => `/objectives/${u}/current`,
    label: 'Current Objective',
    desc: "See what you're working on right now",
    icon: '◎',
    method: null,
  },
  {
    href: (u: string) => `/objectives/${u}`,
    label: 'All Objectives',
    desc: 'Browse your full history and goals',
    icon: '≡',
    method: null,
  },
  {
    href: (u: string) => `/objectives/${u}/create`,
    label: 'Create Objective',
    desc: 'Set a new reading goal to pursue',
    icon: '+',
    method: null,
  },
];

export default function Home() {
  const [userId, setUserId] = useState('');
  const active = userId.trim().length >= 3 && userId.trim().length <= 64;

  return (
    <>
      <style>{styleString}</style>

      <div className="page-wrap">
        <div className="content">
          <div className="eyebrow">Reading Objectives Tracker</div>

          <h1>
            Track your
            <br />
            <em>reading</em> goals.
          </h1>

          <p className="subtitle">
            Set objectives, log progress, and stay motivated — one article, one
            goal at a time.
          </p>

          {/* Username input */}
          <div className="input-section">
            <label className="input-label" htmlFor="userId">
              Your username
            </label>
            <div className="username-row">
              <input
                id="userId"
                className="username-input"
                type="text"
                placeholder="enter your username…"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                maxLength={64}
                minLength={3}
              />
            </div>
            <p className="input-hint">
              {active
                ? `Links below are now configured for "${userId.trim()}".`
                : 'Enter a username between 3 and 64 characters to activate the navigation links below.'}
            </p>
          </div>

          {/* Page links */}
          <div className="section-label">Pages</div>
          <div className="cards-grid">
            {PAGES.map((page) => {
              const href = active ? page.href(userId.trim()) : '#';
              return (
                <a
                  key={page.label}
                  href={href}
                  className={`card${active ? '' : ' disabled'}`}
                >
                  <div className="card-icon">{page.icon}</div>
                  <div className="card-label">{page.label}</div>
                  <div className="card-desc">{page.desc}</div>
                </a>
              );
            })}
          </div>

          <div className="section-label">Why reading objectives?</div>
          <p style={{ marginBottom: '24px' }}>
            Setting clear reading objectives can transform passive consumption
            into active learning. By defining specific goals, you create a
            roadmap for your reading journey, making it easier to stay focused
            and motivated. Whether it's diving deep into a complex topic or
            simply keeping up with industry news, having objectives helps you
            prioritize your reading time and track your progress effectively.
            <br />
            This feature is more intended to be directly included in{' '}
            <em>daily.dev</em>, as a way to encourage users to set concrete
            goals. If it was directly inside your accound, and powered by your
            reading activity using tags, it can help you stay accountable and
            motivated, while also providing insights into your reading habits
            and growth over time.
          </p>

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
