'use client';

import { ObjectivesResponseDto } from '@/lib/types/objectives';

interface Props {
  objective: ObjectivesResponseDto;
}

export function ObjectiveCard({ objective }: Props) {
  const clampedProgress = Math.min(
    Math.max(0, objective.currentProgress),
    objective.targetArticles,
  );
  const percentage =
    objective.targetArticles > 0
      ? Math.round((clampedProgress / objective.targetArticles) * 100)
      : 0;

  const circles = Array.from({ length: objective.targetArticles }, (_, i) => {
    const filled = i < clampedProgress;
    return (
      <span
        key={i}
        className={`circle ${filled ? 'filled' : 'empty'}`}
        aria-label={filled ? 'completed' : 'pending'}
        style={{
          display: 'inline-block',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          marginRight: '8px',
          flexShrink: 0,
          background: filled ? '#b55efc' : 'transparent',
          border: filled ? 'none' : '1.5px solid #3a3a3a',
          boxShadow: filled ? '0 0 6px rgba(181, 94, 252, 0.45)' : 'none',
        }}
      />
    );
  });

  return (
    <div
      style={{
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        borderRadius: '2px',
        padding: '28px 32px',
        color: '#e9e9e9',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background:
            'linear-gradient(90deg, #b55efc 0%, #d99ff4 50%, #b55efc 100%)',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '20px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#e9e9e9',
            margin: 0,
          }}
        >
          {objective.objective}
        </p>
        <span
          style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#b55efc' }}
        >
          {percentage}% | {objective.challengeLevel?.toUpperCase() || 'Unknown'}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '18px',
        }}
      >
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={objective.targetArticles}
        >
          {circles}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#e9e9e9',
            marginLeft: '8px',
            textAlign: 'right',
          }}
        >
          {objective.targetDate
            ? `Target: ${new Date(objective.targetDate).toLocaleDateString()}`
            : ''}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#e9e9e9',
          }}
        >
          # {objective.tag}
        </span>
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: '#e9e9e9',
          }}
        >
          <span style={{ color: '#b55efc' }}>{clampedProgress}</span> /{' '}
          {objective.targetArticles}
        </span>
      </div>
    </div>
  );
}
