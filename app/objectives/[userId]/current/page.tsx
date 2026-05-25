import { getCurrentObjective } from '@/lib/services/objectives';
import { ObjectiveCard } from '@/app/components/ObjectiveCard';
import { styleString } from '@/app/style';

export default async function CurrentObjectivePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  let objective = null;
  let error: string | null = null;

  try {
    objective = getCurrentObjective(userId);
  } catch (e) {
    error = (e as Error)?.message ?? 'Something went wrong.';
  }

  return (
    <>
      <style>{styleString}</style>

      <div className="page-wrap">
        <div className="content">
          {/* Header */}
          <div className="eyebrow">Reading Objectives Tracker</div>

          <h1>
            Your current
            <br />
            <em>objective</em>.
          </h1>

          {/* Section label */}
          <div className="section-label">{userId}</div>

          {/* Body */}
          {error || !objective ? (
            <div
              style={{
                background: '#141810',
                border: '1px solid #2a2f24',
                borderRadius: '14px',
                padding: '32px 28px',
                marginBottom: '40px',
                color: '#5a5348',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              <p style={{ marginBottom: '6px', color: '#8b7f6e' }}>
                No current objective found.
              </p>
              <p style={{ fontSize: '12.5px' }}>{error}</p>
            </div>
          ) : (
            <ObjectiveCard objective={objective} />
          )}

          {/* CTA */}
          <br />
          <div className="cards-grid">
            {objective && (
              <a href={`/objectives/${userId}/progress`} className="card">
                <div className="card-icon">↑</div>
                <div className="card-label">Log Progress</div>
                <div className="card-desc">
                  Update your current objective progress
                </div>
              </a>
            )}
            {!objective && (
              <a href={`/objectives/${userId}/create`} className="card">
                <div className="card-icon">+</div>
                <div className="card-label">Create New Objective</div>
                <div className="card-desc">
                  Set a new reading goal to pursue
                </div>
              </a>
            )}
            <a href={`/objectives/${userId}`} className="card">
              <div className="card-icon">≡</div>
              <div className="card-label">All your objectives</div>
              <div className="card-desc">View all your reading goals</div>
            </a>
          </div>

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
