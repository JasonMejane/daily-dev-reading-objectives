'use client';

import { ObjectivesResponseDto } from '@/lib/types/objectives';

interface Props {
  objectives: ObjectivesResponseDto[];
}

export function ObjectivesList({ objectives }: Props) {
  if (!objectives || objectives.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#e9e9e9',
          fontSize: '13px',
        }}
      >
        No objectives yet. Create one to get started!
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {objectives.map((obj) => {
        const statusClass = obj.status?.toLowerCase() || 'active';
        const targetDate = obj.targetDate
          ? `Target: ${new Date(obj.targetDate).toLocaleDateString()}`
          : 'No deadline';
        const progress = obj.currentProgress || 0;
        const target = obj.targetArticles || 0;
        const completionDate = obj.completedAt
          ? `Completed: ${new Date(obj.completedAt).toLocaleDateString()}`
          : null;

        return (
          <div
            key={obj.id}
            style={{
              border: '1px solid #2a2a2a',
              borderRadius: '2px',
              padding: '16px 20px',
              background: '#0f0f0f',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background:
                  'linear-gradient(90deg, #b55efc 0%, #d99ff4 50%, #b55efc 100%)',
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '13px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#e9e9e9',
                    fontWeight: 'normal',
                    margin: '0 0 4px 0',
                  }}
                >
                  {obj.objective || 'Untitled'}
                </p>
                <span
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#b55efc',
                    fontWeight: 'normal',
                  }}
                >
                  # {obj.tag || 'untagged'}
                </span>
              </div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 'normal',
                  background:
                    statusClass === 'active'
                      ? 'rgba(181, 94, 252, 0.2)'
                      : statusClass === 'completed'
                        ? 'rgba(81, 207, 102, 0.2)'
                        : 'rgba(168, 162, 142, 0.2)',
                  color:
                    statusClass === 'active'
                      ? '#b55efc'
                      : statusClass === 'completed'
                        ? '#51cf66'
                        : '#a8a28e',
                  border:
                    statusClass === 'active'
                      ? '1px solid #b55efc'
                      : statusClass === 'completed'
                        ? '1px solid #51cf66'
                        : '1px solid #a8a28e',
                }}
              >
                {obj.status || 'active'}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                color: '#e9e9e9',
              }}
            >
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <span style={{ color: '#b55efc', fontWeight: 'normal' }}>
                  {progress} / {target}{' '}
                </span>
                <span> {obj.challengeLevel?.toUpperCase() || 'Unknown'}</span>
              </div>
              <span style={{ color: '#e9e9e9', fontSize: '10px' }}>
                {completionDate ? completionDate : targetDate}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
