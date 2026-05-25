export const styleString = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background-color: #0c0f0a;
          color: #f2ede4;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: 100vh;
        }

        .page-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow in corner */
        .page-wrap::before {
          content: '';
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .page-wrap::after {
          content: '';
          position: fixed;
          bottom: -80px;
          left: -80px;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          padding: 72px 32px 80px;
          width: 100%;
        }

        /* Header */
        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b55efc;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .eyebrow::after {
          content: '';
          flex: 1;
          max-width: 48px;
          height: 1px;
          background: #b55efc;
          opacity: 0.5;
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(42px, 7vw, 72px);
          line-height: 1.05;
          color: #f2ede4;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        h1 em {
          font-style: italic;
          color: #b55efc;
        }

        .subtitle {
          font-size: 16px;
          line-height: 1.7;
          color: #8b7f6e;
          max-width: 480px;
          margin-bottom: 52px;
        }

        /* Username input section */
        .input-section {
          background: #141810;
          border: 1px solid #2a2f24;
          border-radius: 14px;
          padding: 28px 28px 24px;
          margin-bottom: 40px;
          position: relative;
          transition: border-color 0.2s;
        }
        .input-section:focus-within {
          border-color: #c9a84c44;
        }

        .input-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b6358;
          margin-bottom: 10px;
          display: block;
        }

        .username-row {
          display: flex;
          align-items: center;
          gap: 0;
          background: #0c0f0a;
          border: 1px solid #2a2f24;
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .username-row:focus-within {
          border-color: #c9a84c66;
        }

        .username-prefix {
          padding: 12px 14px 12px 16px;
          font-size: 14px;
          color: #6b6358;
          background: transparent;
          border-right: 1px solid #2a2f24;
          white-space: nowrap;
          font-family: 'DM Sans', monospace;
        }

        .username-input {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #f2ede4;
          caret-color: #b55efc;
        }
        .username-input::placeholder { color: #3a3a32; }

        .input-hint {
          margin-top: 10px;
          font-size: 12px;
          color: #4a453c;
        }

        /* Divider */
        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4a453c;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1e2318;
        }

        /* Page cards */
        .cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 52px;
        }
        @media (max-width: 520px) { .cards-grid { grid-template-columns: 1fr; } }

        .card {
          display: block;
          background: #141810;
          border: 1px solid #2a2f24;
          border-radius: 12px;
          padding: 20px 22px;
          text-decoration: none;
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .card.disabled {
          opacity: 0.38;
          cursor: not-allowed;
          pointer-events: none;
        }
        .card:not(.disabled):hover {
          background: #181d13;
          border-color: #c9a84c44;
          transform: translateY(-2px);
        }
        .card:not(.disabled):hover .card-icon {
          color: #b55efc;
        }

        .card-icon {
          font-size: 20px;
          color: #3a3a32;
          margin-bottom: 12px;
          transition: color 0.18s;
          line-height: 1;
        }

        .card-label {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #f2ede4;
          margin-bottom: 5px;
        }

        .card-desc {
          font-size: 12.5px;
          color: #5a5348;
          line-height: 1.5;
        }

        /* API table */
        .api-table {
          width: 100%;
          border-collapse: collapse;
        }
        .api-table tr {
          border-bottom: 1px solid #1a1f15;
        }
        .api-table tr:last-child { border-bottom: none; }
        .api-table td {
          padding: 12px 0;
          font-size: 13px;
          vertical-align: top;
        }
        .api-table td:first-child { width: 62px; }
        .api-table td:nth-child(2) {
          font-family: 'DM Sans', monospace;
          color: #8b7f6e;
          padding-right: 20px;
          font-size: 12.5px;
        }
        .api-table td:last-child { color: #4a453c; font-size: 12px; }

        .method-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 2px 7px;
          border-radius: 4px;
          background: #1a1f15;
        }

        /* Footer */
        .footer {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid #1a1f15;
          font-size: 11.5px;
          color: #3a3530;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `;
