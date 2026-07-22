/* Perry pitch intro — kinetic typography scenes */
(function () {
  const { SceneStage, useScene, Easing, clamp } = window;
  const { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor } = window;
  const Pal = React.createContext({ ink: '#17150f', paper: '#f6f4ee', accent: '#009C7F', dark: false });
  const T = "'Source Serif 4',serif";   // display titles
  const F = "'Archivo',sans-serif";
  const M = "'IBM Plex Mono',monospace";
  const ez = (p, at, dur, fn) => (fn || Easing.easeOutCubic)(clamp((p - at) / dur, 0, 1));

  function Kicker({ p, at, num, text }) {
    const pal = React.useContext(Pal);
    const e = ez(p, at, 0.08);
    return (
      <div style={{ position: 'absolute', top: 72, left: 110, fontFamily: M, fontSize: 26, letterSpacing: '0.18em', color: pal.ink, opacity: e * 0.9, transform: `translateX(${(1 - e) * -24}px)`, display: 'flex', gap: 20 }}>
        <span style={{ color: pal.accent, fontWeight: 500 }}>{num}</span>
        <span>{text}</span>
      </div>
    );
  }

  function SectionTitle({ p, num, text }) {
    const pal = React.useContext(Pal);
    const e = ez(p, 0.005, 0.05);
    const w = ez(p, 0.03, 0.07);
    return (
      <div style={{ position: 'absolute', top: 130, left: 110 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, opacity: e, transform: `translateY(${(1 - e) * 22}px)` }}>
          <span style={{ fontFamily: T, fontWeight: 600, fontSize: 66, color: pal.accent }}>{num}</span>
          <span style={{ fontFamily: M, fontSize: 31, letterSpacing: '0.24em', color: pal.ink }}>{text}</span>
        </div>
        <div style={{ height: 4, width: 340 * w, background: pal.accent, marginTop: 16, borderRadius: 2 }} />
      </div>
    );
  }

  function Slam({ p, at, dur = 0.09, size = 150, color, style, children }) {
    const raw = clamp((p - at) / dur, 0, 1);
    const e = Easing.easeOutCubic(raw);
    return (
      <div style={{ fontFamily: T, fontWeight: 600, fontSize: size, lineHeight: 1.04, letterSpacing: '-0.01em', color, opacity: raw === 0 ? 0 : Math.min(1, raw * 3), transform: `translateY(${(1 - e) * 46}px) scale(${1.28 - 0.28 * e})`, transformOrigin: 'left bottom', ...style }}>
        {children}
      </div>
    );
  }

  function KpiFlip({ p, at, label, from, to }) {
    const pal = React.useContext(Pal);
    const e1 = ez(p, at, 0.05);
    const st = ez(p, at + 0.04, 0.04);
    const e2 = ez(p, at + 0.07, 0.06, Easing.easeOutBack);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 30, opacity: e1, transform: `translateY(${(1 - e1) * 24}px)` }}>
        <span style={{ fontFamily: M, fontSize: 25, letterSpacing: '0.12em', opacity: 0.62, color: pal.ink, width: 470, textTransform: 'uppercase' }}>{label}</span>
        <span style={{ position: 'relative', fontFamily: M, fontSize: 42, color: pal.ink, opacity: 0.55, whiteSpace: 'nowrap' }}>
          {from}
          <span style={{ position: 'absolute', left: -4, top: '52%', height: 5, width: `${st * 106}%`, background: pal.accent, borderRadius: 3 }} />
        </span>
        <span style={{ fontFamily: M, fontSize: 42, color: pal.ink, opacity: e2 > 0 ? 0.8 : 0 }}>→</span>
        <span style={{ fontFamily: T, fontWeight: 600, fontSize: 58, color: pal.accent, opacity: Math.min(1, e2 * 2), transform: `scale(${0.7 + 0.3 * e2})`, display: 'inline-block', transformOrigin: 'left center', whiteSpace: 'nowrap' }}>{to}</span>
      </div>
    );
  }

  function SHook() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const logo = ez(p, 0.04, 0.12);
    const logoPop = ez(p, 0.04, 0.18, Easing.easeOutBack);
    const rule = ez(p, 0.22, 0.1);
    const line = ez(p, 0.32, 0.1);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="assets/perry-logo.png" alt="Perry" style={{ width: 620, opacity: logo, transform: `scale(${0.85 + 0.15 * logoPop})`, filter: pal.dark ? 'invert(1)' : 'none' }} />
        <div style={{ height: 4, width: 460 * rule, background: pal.accent, borderRadius: 2, margin: '46px 0 34px' }} />
        <div style={{ fontFamily: T, fontWeight: 600, fontSize: 54, color: pal.accent, opacity: line, transform: `translateY(${(1 - line) * 14}px)` }}>Meet the legal OS.</div>
      </div>
    );
  }

  function HookLines({ p, l1, l2, size = 104 }) {
    const pal = React.useContext(Pal);
    return (
      <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Slam p={p} at={0.02} size={size} color={pal.ink}>{l1}</Slam>
        <Slam p={p} at={0.075} size={size} color={pal.accent}>{l2}</Slam>
      </div>
    );
  }

  const QUOTE = [['“Does', 0], ['the', 0], ['SPA', 1], ['require', 0], ['consent', 1], ['for', 0], ['this', 0], ['secondary', 1], ['transfer?”', 0]];
  function Quote({ p, at, words, pre }) {
    const pal = React.useContext(Pal);
    return (
      <div style={{ position: 'absolute', inset: 0, padding: '0 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {pre && <div style={{ fontFamily: M, fontSize: 28, color: pal.ink, opacity: ez(p, Math.max(0, at - 0.04), 0.05) * 0.7, marginBottom: 30 }}>{pre}</div>}
        <div style={{ fontFamily: T, fontWeight: 600, fontSize: 88, lineHeight: 1.18, maxWidth: 1320, letterSpacing: '-0.01em', fontStyle: 'italic' }}>
          {words.map(([w, acc], i) => {
            const e = ez(p, at + i * 0.012, 0.045);
            return <span key={i} style={{ display: 'inline-block', marginRight: '0.26em', opacity: e, transform: `translateY(${(1 - e) * 30}px)`, color: acc ? pal.accent : pal.ink }}>{w}</span>;
          })}
        </div>
      </div>
    );
  }
  function Cursor({ x, y, opacity }) {
    return (
      <svg width="26" height="30" viewBox="0 0 13 18" style={{ position: 'absolute', left: x, top: y, opacity, zIndex: 30, filter: 'drop-shadow(0 2px 4px rgba(16,18,21,0.35))' }}>
        <path d="M0.5 0.5 L0.5 16 L4.8 12.4 L7.2 17.5 L9.6 16.4 L7.2 11.4 L12.2 11.2 Z" fill="#101215" stroke="#ffffff" strokeWidth="1" />
      </svg>
    );
  }

  function AnswerDoc({ p, pal }) {
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const badgeRef = React.useRef(null);
    const colRef = React.useRef(null);
    const [bp, setBp] = React.useState({ x: 640, y: 470 });
    const [maxScroll, setMaxScroll] = React.useState(300);
    React.useLayoutEffect(() => {
      if (badgeRef.current && colRef.current) {
        const b = badgeRef.current.getBoundingClientRect();
        const c = colRef.current.getBoundingClientRect();
        const k = colRef.current.offsetWidth / (c.width || 1);
        setBp({ x: (b.left - c.left + b.width / 2) * k, y: (b.top - c.top + b.height / 2) * k });
        setMaxScroll(Math.max(0, colRef.current.offsetHeight - 548));
      }
    }, []);
    const cardIn = ez(p, 0.23, 0.06);
    const reveal = ez(p, 0.29, 0.07);
    const scroll = Math.min(maxScroll, 130 * ez(p, 0.37, 0.06) + 430 * ez(p, 0.64, 0.07));
    const move = ez(p, 0.42, 0.06);
    const curX = bp.x + 300 * (1 - move) + 13;
    const curY = bp.y + 230 * (1 - move) - 2;
    const curO = ez(p, 0.42, 0.04) * (1 - ez(p, 0.6, 0.04));
    const hover = p >= 0.475 && p < 0.64;
    const popVis = Math.min(ez(p, 0.495, 0.05), 1 - ez(p, 0.62, 0.05));
    const zoom = 1 + 0.09 * Math.min(ez(p, 0.46, 0.07), 1 - ez(p, 0.64, 0.07));
    const h2 = { fontFamily: T, fontWeight: 600, fontSize: 30, color: pal.ink, margin: '34px 0 12px' };
    const body = { fontFamily: F, fontWeight: 400, fontSize: 21.5, lineHeight: 1.55, color: pal.ink, opacity: 0.92 };
    const badge = (n, hot, ref) => (
      <span ref={ref} style={{ display: 'inline-block', fontFamily: M, fontSize: 16, color: hot ? '#fff' : pal.accent, background: hot ? pal.accent : (pal.dark ? 'rgba(0,156,127,0.18)' : 'rgba(0,156,127,0.12)'), border: `1px solid ${pal.accent}`, borderRadius: 7, padding: '1px 9px', marginLeft: 8, verticalAlign: '2px', transform: hot ? 'scale(1.15)' : 'scale(1)' }}>{n}</span>
    );
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1120, height: 660, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${(0.96 + 0.04 * cardIn) * zoom})`, transformOrigin: '42% 45%', overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: '36px 48px 18px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${cardBorder}`, paddingBottom: 20 }}>
            <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
            <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>ASSISTANT</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: M, fontSize: 15, color: pal.ink, opacity: 0.45 }}>Orange Ltd · Series B</span>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 80, bottom: 0, overflow: 'hidden' }}>
            <div ref={colRef} style={{ position: 'absolute', left: 48, right: 48, top: 0, transform: `translateY(${24 - scroll}px)` }}>
              <div style={{ background: pillBg, borderRadius: 999, padding: '18px 30px', fontFamily: M, fontSize: 22, color: pal.ink }}>
                Does the SPA require consent for this secondary transfer?
              </div>
              <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 16}px)` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '24px 0 6px', fontFamily: M, fontSize: 17, color: pal.ink, opacity: 0.55 }}>
                  <span style={{ width: 13, height: 16, border: `1.5px solid ${pal.ink}`, borderRadius: 3, display: 'inline-block' }} />
                  Searched deal room · 3 documents
                </div>
                <div style={{ ...body, margin: '14px 0 4px' }}>Yes — subject to limited exceptions. Across the Orange Ltd Series B suite:</div>
                <div style={h2}>Share Purchase Agreement — cl. 8.2</div>
                <div style={body}>
                  Secondary transfers of Preferred Shares require <strong>prior written consent of the Majority Preferred</strong>, except for Permitted Transfers to Affiliates on the same terms.{badge('1', hover, badgeRef)}
                </div>
                <div style={h2}>Shareholders&apos; Agreement — ROFR</div>
                <div style={body}>
                  Before any transfer, the selling shareholder must first offer the shares to existing Preferred under the <strong>right of first refusal</strong>; investor consent alone does not bypass that process.{badge('2', false, null)}
                </div>
                <div style={h2}>Management Side Letter — carve-out</div>
                <div style={body}>
                  Transfers by Management Sellers of up to <strong>2% in aggregate per year</strong> are treated as Permitted Transfers and do <strong>not</strong> require Preferred consent.{badge('3', false, null)}
                </div>
              </div>
              <div style={{ position: 'absolute', left: Math.max(0, bp.x - 450), top: bp.y + 22, width: 420, background: cardBg, border: `1px solid ${cardBorder}`, borderLeft: `3px solid ${pal.accent}`, borderRadius: 12, boxShadow: '0 16px 40px rgba(16,18,21,0.18)', padding: '20px 24px', opacity: popVis, transform: `translateY(${(1 - popVis) * 10}px)`, zIndex: 20 }}>
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink, lineHeight: 1.4 }}>Orange Ltd — Series B — Share Purchase Agreement.docx</div>
                <div style={{ fontFamily: M, fontSize: 15, color: pal.accent, margin: '8px 0 10px' }}>cl. 8.2 · Transfer restrictions</div>
                <div style={{ fontFamily: F, fontStyle: 'italic', fontSize: 16.5, lineHeight: 1.55, color: pal.ink, opacity: 0.85 }}>
                  “No Preferred Shareholder shall Transfer any Preferred Shares without the prior written consent of the Majority Preferred, save for a Permitted Transfer to an Affiliate…”
                </div>
              </div>
              <Cursor x={curX} y={curY} opacity={curO} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SAsk() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const phase = p < 0.22 ? 0 : p < 0.7 ? 1 : 2;
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 ? <SectionTitle p={p} num="02" text="ASK ANYTHING" /> : <Kicker p={p} at={0.02} num="02" text="ASK ANYTHING" />}
        {phase === 0 && <Quote p={p} at={0.07} words={QUOTE} pre="Deal counsel, night before signing —" />}
        {phase === 1 && <AnswerDoc p={p} pal={pal} />}
        {phase === 2 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.71} size={150} color={pal.ink}>Ask.</Slam>
            <Slam p={p} at={0.74} size={150} color={pal.ink}>Answered.</Slam>
            <Slam p={p} at={0.77} size={150} color={pal.accent}>Cited.<span style={{ display: 'inline-block', fontFamily: M, fontStyle: 'normal', fontSize: 34, fontWeight: 400, color: pal.accent, border: `2px solid ${pal.accent}`, borderRadius: 10, padding: '2px 18px', marginLeft: 26, verticalAlign: '18px' }}>1</span></Slam>
            <div style={{ marginTop: 52 }}>
              <KpiFlip p={p} at={0.8} label="Deal question" from="2 hrs" to="4 min" />
            </div>
          </div>
        )}
      </div>
    );
  }

  function Check({ on, accent }) {
    return (
      <span style={{ width: 26, height: 26, borderRadius: 13, flexShrink: 0, background: on ? accent : 'rgba(120,120,120,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? 1 : 0.8})` }}>
        <svg width="13" height="11" viewBox="0 0 13 11"><polyline points="1.5,5.5 5,9 11.5,1.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    );
  }

  function Redline({ strike, children, to, accent }) {
    return (
      <span>
        <span style={{ position: 'relative', opacity: strike > 0.9 ? 0.45 : 0.85 }}>
          {children}
          <span style={{ position: 'absolute', left: 0, top: '52%', height: 2.5, width: `${strike * 100}%`, background: '#C43D3D' }} />
        </span>
        <span style={{ color: accent, fontWeight: 600, opacity: strike, marginLeft: 8 }}>{to}</span>
      </span>
    );
  }

  function SNda() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const phase = p < 0.17 ? 0 : p < 0.44 ? 1 : p < 0.74 ? 2 : 3;
    const cardIn = ez(p, 0.18, 0.05);
    const mailIn = ez(p, 0.22, 0.05);
    const s1 = ez(p, 0.29, 0.05);
    const s2 = ez(p, 0.36, 0.05);
    const docIn = ez(p, 0.45, 0.06);
    const strike1 = ez(p, 0.51, 0.05);
    const strike2 = ez(p, 0.565, 0.05);
    const s3 = ez(p, 0.62, 0.05);
    const mono = { fontFamily: M, fontSize: 19, color: pal.ink };
    const stepLabel = { fontFamily: F, fontWeight: 600, fontSize: 23, color: pal.ink };
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 ? <SectionTitle p={p} num="03" text="NDA AUTOMATION" /> : <Kicker p={p} at={0} num="03" text="NDA AUTOMATION" />}
        {phase === 0 && <HookLines p={p} l1="Another NDA just landed." l2="It's the ninth this week." />}
        {phase === 1 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 1120, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '36px 48px 40px', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${0.96 + 0.04 * cardIn})` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26 }}>
                <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
                <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>AGENT</span>
              </div>
              <div style={{ background: pillBg, borderRadius: 14, padding: '18px 26px', opacity: mailIn, transform: `translateX(${(1 - mailIn) * -30}px)`, display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ width: 46, height: 46, borderRadius: 23, flexShrink: 0, background: pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="18" viewBox="0 0 22 18"><rect x="1" y="1" width="20" height="16" rx="2.5" fill="none" stroke={pal.ink} strokeWidth="1.6" /><polyline points="1.5,2.5 11,10 20.5,2.5" fill="none" stroke={pal.ink} strokeWidth="1.6" strokeLinejoin="round" /></svg>
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ ...mono, opacity: 0.55, fontSize: 16, marginBottom: 6 }}>INBOUND EMAIL · legal@acmecorp.com</div>
                  <div style={{ fontFamily: F, fontWeight: 600, fontSize: 22, color: pal.ink }}>Mutual NDA for signature</div>
                </div>
                <span style={{ ...mono, fontSize: 17, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '7px 16px' }}>Acme_Mutual_NDA_v3.docx</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 26 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: s1, transform: `translateY(${(1 - s1) * 14}px)` }}>
                  <Check on={s1 > 0.5} accent={pal.accent} />
                  <span style={stepLabel}>NDA recognised — mutual, inbound paper</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: s2, transform: `translateY(${(1 - s2) * 14}px)` }}>
                  <Check on={s2 > 0.6} accent={pal.accent} />
                  <span style={stepLabel}>Applying rule set: <span style={{ color: pal.accent }}>NDA review rules</span></span>
                  <span style={{ ...mono, fontSize: 16, opacity: 0.55 }}>12 rules</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {phase === 2 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
            <div style={{ width: 900, display: 'flex', alignItems: 'center', opacity: docIn }}>
              <span style={{ ...mono, opacity: 0.6 }}>Acme_Mutual_NDA_v3_redline.docx</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontFamily: M, fontSize: 15, color: '#fff', background: '#C43D3D', borderRadius: 999, padding: '5px 14px' }}>2 tracked changes</span>
            </div>
            <div style={{ width: 900, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 10, boxShadow: '0 24px 60px rgba(16,18,21,0.12)', padding: '48px 72px 52px', opacity: docIn, transform: `translateY(${(1 - docIn) * 40}px)` }}>
              <div style={{ fontFamily: T, fontWeight: 600, fontSize: 23, letterSpacing: '0.08em', textAlign: 'center', color: pal.ink, marginBottom: 30 }}>MUTUAL NON-DISCLOSURE AGREEMENT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
                {[100, 94, 62].map((w, i) => <div key={i} style={{ height: 9, width: `${w}%`, borderRadius: 5, background: pal.ink, opacity: 0.1 }} />)}
              </div>
              <div style={{ position: 'relative', fontFamily: T, fontSize: 20, lineHeight: 1.75, color: pal.ink }}>
                <span style={{ position: 'absolute', left: -30, top: 4, bottom: 4, width: 3, background: pal.accent, opacity: strike1 }} />
                <strong>3. Term.</strong> This Agreement shall remain in force for a period of <Redline strike={strike1} to="two (2) years" accent={pal.accent}>five (5) years</Redline> from the Effective Date, unless earlier terminated in accordance with clause 8.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, margin: '26px 0' }}>
                {[97, 88].map((w, i) => <div key={i} style={{ height: 9, width: `${w}%`, borderRadius: 5, background: pal.ink, opacity: 0.1 }} />)}
              </div>
              <div style={{ position: 'relative', fontFamily: T, fontSize: 20, lineHeight: 1.75, color: pal.ink }}>
                <span style={{ position: 'absolute', left: -30, top: 4, bottom: 4, width: 3, background: pal.accent, opacity: strike2 }} />
                <strong>9. Governing Law.</strong> This Agreement shall be governed by the laws of <Redline strike={strike2} to="England and Wales" accent={pal.accent}>the State of New York</Redline>, and the parties submit to the exclusive jurisdiction of its courts.
              </div>
            </div>
            <div style={{ width: 900, display: 'flex', alignItems: 'center', gap: 14, opacity: s3, transform: `translateY(${(1 - s3) * 12}px)` }}>
              <Check on={s3 > 0.5} accent={pal.accent} />
              <span style={{ fontFamily: F, fontWeight: 600, fontSize: 21, color: pal.ink }}>Redlined draft returned to sender</span>
              <span style={{ ...mono, fontSize: 16, opacity: 0.55 }}>reply drafted · changes summarised</span>
            </div>
          </div>
        )}
        {phase === 3 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.75} size={122} color={pal.ink}>Reviewed before</Slam>
            <Slam p={p} at={0.775} size={122} color={pal.accent}>you’ve opened the email.</Slam>
            <div style={{ marginTop: 56 }}>
              <KpiFlip p={p} at={0.795} label="NDA review" from="30 min" to="7 min" />
            </div>
          </div>
        )}
      </div>
    );
  }

  const PORTFOLIO_PREFS = [
    { co: 'Orange Ltd', doc: 'Series A AoA', term: 'Participating, as-converted', hot: false },
    { co: 'Grape Ltd', doc: 'Seed AoA', term: '1× non-participating', hot: true },
    { co: 'Mango Ltd', doc: 'Series A AoA', term: 'Multi-tranche waterfall · 1.2×', hot: false },
  ];
  function SPatterns() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const phase = p < 0.22 ? 0 : p < 0.76 ? 1 : 2;
    const cardIn = ez(p, 0.23, 0.06);
    const qIn = ez(p, 0.28, 0.06);
    const ansIn = ez(p, 0.36, 0.07);
    const takeaway = ez(p, 0.62, 0.06);
    const cols = 22, rows = 3, total = cols * rows;
    const fillN = Math.floor(ez(p, 0.8, 0.12) * total);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 ? <SectionTitle p={p} num="01" text="TRENDS & INSIGHT" /> : <Kicker p={p} at={0} num="01" text="TRENDS & INSIGHT" />}
        {phase === 0 && <HookLines p={p} l1="You've signed 200 agreements." l2="What did they tell you?" />}
        {phase === 1 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
            <div style={{ width: 1160, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '36px 48px 42px', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${0.96 + 0.04 * cardIn})` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
                <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>INSIGHTS</span>
                <span style={{ flex: 1 }} />
                <span style={{ ...mono, opacity: 0.55 }}>trailing 12 months · 14 companies</span>
              </div>
              <div style={{ background: pillBg, borderRadius: 999, padding: '18px 30px', fontFamily: M, fontSize: 22, color: pal.ink, opacity: qIn, transform: `translateY(${(1 - qIn) * 14}px)`, marginBottom: 28 }}>
                What are the liquidation preferences across our portfolio?
              </div>
              <div style={{ opacity: ansIn, transform: `translateY(${(1 - ansIn) * 16}px)` }}>
                <div style={{ fontFamily: T, fontWeight: 600, fontSize: 36, lineHeight: 1.25, color: pal.ink, maxWidth: 980, marginBottom: 28 }}>
                  Mostly <span style={{ color: pal.accent }}>1× non-participating</span> — 12 of 14 portfolio companies. Two carry a 1.5× senior preference.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                  {PORTFOLIO_PREFS.map((row, i) => {
                    const e = ez(p, 0.44 + i * 0.045, 0.07);
                    return (
                      <div key={row.co} style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: e, transform: `translateY(${(1 - e) * 12}px)`, padding: '14px 18px', borderRadius: 12, background: pal.dark ? 'rgba(242,239,232,0.05)' : 'rgba(16,18,21,0.035)' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: F, fontWeight: 600, fontSize: 22, color: pal.ink }}>{row.co}</div>
                          <div style={{ ...mono, fontSize: 15, opacity: 0.5, marginTop: 4 }}>{row.doc}</div>
                        </div>
                        <div style={{ fontFamily: M, fontSize: 18, color: row.hot ? pal.accent : pal.ink, fontWeight: row.hot ? 500 : 400 }}>{row.term}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 12, opacity: ez(p, 0.56, 0.05) }}>
                  {['14 documents queried', '8 citations'].map((t) => (
                    <span key={t} style={{ ...mono, fontSize: 15, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '7px 16px', opacity: 0.75 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 30, opacity: takeaway, transform: `translateY(${(1 - takeaway) * 12}px)` }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: pal.accent }} />
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 22, color: pal.ink }}>1× non-participating is becoming your market standard — up 18% year-on-year.</span>
              </div>
            </div>
            <div style={{ width: 1160, opacity: ez(p, 0.28, 0.06), transform: `translateY(${(1 - ez(p, 0.28, 0.06)) * 14}px)` }}>
              <span style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 27, color: pal.ink }}>Your next term sheet, negotiated from data — <span style={{ color: pal.accent }}>not recollection.</span></span>
            </div>
          </div>
        )}
        {phase === 2 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div>
              <Slam p={p} at={0.77} size={108} color={pal.ink}>One document is an answer.</Slam>
              <Slam p={p} at={0.81} size={108} color={pal.accent}>Two hundred are a strategy.</Slam>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: 10, marginTop: 60, width: 1150 }}>
                {Array.from({ length: total }, (_, i) => {
                  const on = i < fillN;
                  const hot = i % 7 === 3;
                  return <div key={i} style={{ height: 26, borderRadius: 4, background: on && hot ? pal.accent : pal.ink, opacity: on ? (hot ? 1 : 0.16) : 0.05 }} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const TASKS = [
    { t: 'Collect signed IP assignment', c: 'Mango Ltd', o: 'External counsel', d: '01 Aug', s0: 'Awaiting signature', done: 0.5 },
    { t: 'File SH01 \u2014 share allotment', c: 'Orange Ltd', o: 'J. Whitfield', d: '08 Aug', s0: 'In progress', done: 0.6 },
    { t: 'Board consent \u2014 ESOP top-up', c: 'Grape Ltd', o: 'External counsel', d: '15 Aug', s0: 'Waiting on counterparty', done: null },
    { t: 'Update cap table post-closing', c: 'Orange Ltd', o: 'M. Osei', d: '22 Aug', s0: 'Not started', done: null },
  ];
  function TaskDetail({ p }) {
    const pal = React.useContext(Pal);
    const { localTime } = useScene();
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const cardIn = ez(p, 0.14, 0.05);
    const TYPE1 = '@El';
    const n1 = Math.round(clamp((p - 0.19) / 0.04, 0, 1) * TYPE1.length);
    const dropVis = Math.min(ez(p, 0.22, 0.04), 1 - ez(p, 0.285, 0.03));
    const mentioned = p >= 0.295;
    const REST = ' could you circulate the board consent for signature this week?';
    const restIn = ez(p, 0.31, 0.05);
    const posted = p >= 0.42;
    const notified = ez(p, 0.45, 0.04);
    const caret = !posted && p >= 0.17 && Math.floor(localTime * 2.5) % 2 === 0;
    const press = 1 - 0.08 * Math.sin(Math.PI * clamp((p - 0.405) / 0.025, 0, 1));
    const mentionChip = (
      <span style={{ color: pal.accent, fontWeight: 600, background: pal.dark ? 'rgba(0,156,127,0.18)' : 'rgba(0,156,127,0.1)', borderRadius: 6, padding: '1px 6px' }}>@Elena Ruiz</span>
    );
    const commentBody = (
      <span style={{ fontFamily: F, fontSize: 20, lineHeight: 1.6, color: pal.ink }}>
        {mentioned ? mentionChip : <span style={{ color: pal.accent, fontWeight: 600 }}>{TYPE1.slice(0, n1)}</span>}
        {mentioned ? <span style={{ opacity: posted ? 1 : restIn }}>{REST}</span> : ''}
        {caret && <span style={{ borderLeft: `2px solid ${pal.ink}`, marginLeft: 2 }} />}
      </span>
    );
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1080, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '36px 48px 40px', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${0.96 + 0.04 * cardIn})`, position: 'relative' }}>
          <div style={{ ...mono, opacity: 0.55, marginBottom: 18 }}>← All tasks</div>
          <div style={{ fontFamily: T, fontWeight: 600, fontSize: 40, color: pal.ink }}>Board consent — ESOP top-up</div>
          <div style={{ display: 'flex', gap: 12, margin: '18px 0 28px' }}>
            {['Grape Ltd', 'Due 15 Aug', 'Waiting on counterparty'].map((c, i) => (
              <span key={c} style={{ fontFamily: M, fontSize: 15, color: i === 2 ? '#fff' : pal.ink, opacity: i === 2 ? 1 : 0.75, background: i === 2 ? '#b0873a' : (pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.07)'), borderRadius: 999, padding: '7px 15px' }}>{c}</span>
            ))}
          </div>
          <div style={{ ...mono, fontSize: 15, letterSpacing: '0.12em', opacity: 0.5, borderBottom: `1px solid ${cardBorder}`, paddingBottom: 10 }}>COMMENTS</div>
          {posted && (
            <div style={{ display: 'flex', gap: 16, padding: '20px 0 4px' }}>
              <span style={{ width: 38, height: 38, borderRadius: 19, flexShrink: 0, background: pal.dark ? 'rgba(242,239,232,0.12)' : 'rgba(16,18,21,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: M, fontSize: 14, color: pal.ink }}>JW</span>
              <div>
                <div style={{ ...mono, fontSize: 15, opacity: 0.55, marginBottom: 6 }}>J. Whitfield · just now</div>
                {commentBody}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, opacity: notified }}>
                  <Check on={notified > 0.5} accent={pal.accent} />
                  <span style={{ ...mono, opacity: 0.7 }}>Elena Ruiz (Grape Ltd) notified by email</span>
                </div>
              </div>
            </div>
          )}
          {!posted && (
            <div style={{ position: 'relative', marginTop: 20 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ width: 38, height: 38, borderRadius: 19, flexShrink: 0, background: pal.dark ? 'rgba(242,239,232,0.12)' : 'rgba(16,18,21,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: M, fontSize: 14, color: pal.ink }}>JW</span>
                <div style={{ flex: 1, minHeight: 96, background: pillBg, border: `1px solid ${cardBorder}`, borderRadius: 14, padding: '16px 20px' }}>{commentBody}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: pal.dark ? '#141310' : '#fafafa', background: pal.dark ? '#f2efe8' : '#18181b', borderRadius: 999, padding: '9px 22px', transform: `scale(${press})` }}>Comment</span>
              </div>
              <div style={{ position: 'absolute', left: 54, top: 62, width: 380, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 12, boxShadow: '0 16px 40px rgba(16,18,21,0.18)', padding: 8, opacity: dropVis, transform: `translateY(${(1 - dropVis) * 8}px)`, zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: pal.dark ? 'rgba(0,156,127,0.16)' : 'rgba(0,156,127,0.08)', borderRadius: 8, padding: '10px 14px' }}>
                  <span style={{ width: 34, height: 34, borderRadius: 17, background: pal.accent, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: M, fontSize: 13 }}>ER</span>
                  <div>
                    <div style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink }}>Elena Ruiz</div>
                    <div style={{ ...mono, fontSize: 14, opacity: 0.6 }}>COO · Grape Ltd</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function STrack() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const phase = p < 0.13 ? 0 : p < 0.6 ? 1 : p < 0.78 ? 2 : 3;
    const cardIn = ez(p, 0.61, 0.05);
    const doneCount = (p >= 0.65 ? 1 : 0) + (p >= 0.74 ? 1 : 0);
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 ? <SectionTitle p={p} num="04" text="POST-CLOSE TRACKING" /> : <Kicker p={p} at={0} num="04" text="POST-CLOSE TRACKING" />}
        {phase === 0 && <HookLines p={p} size={124} l1="The deal closed." l2="The work didn't." />}
        {phase === 1 && <TaskDetail p={p} />}
        {phase === 2 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 1180, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '36px 48px 40px', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${0.96 + 0.04 * cardIn})` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
                <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>TASKS</span>
                <span style={{ flex: 1 }} />
                <span style={{ ...mono, opacity: 0.6 }}>{doneCount} of 4 complete</span>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.dark ? '#141310' : '#fafafa', background: pal.dark ? '#f2efe8' : '#18181b', borderRadius: 999, padding: '10px 22px' }}>+ New task</span>
              </div>
              <div style={{ ...mono, background: pillBg, borderRadius: 999, padding: '12px 24px', margin: '24px 0 8px', opacity: 0.55 }}>Search tasks…</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px 170px 90px 220px', gap: 14, padding: '14px 8px 10px', borderBottom: `1px solid ${cardBorder}`, fontFamily: M, fontSize: 15, letterSpacing: '0.1em', color: pal.ink, opacity: 0.5 }}>
                <span>TASK</span><span>COMPANY</span><span>OWNER</span><span>DUE</span><span>STATUS</span>
              </div>
              {TASKS.map((task, i) => {
                const e = ez(p, 0.63 + i * 0.03, 0.05);
                const dn = task.done ? ez(p, task.done + 0.12, 0.04) : 0;
                const isDone = dn > 0.5;
                const hl = 0;
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 130px 170px 90px 220px', gap: 14, alignItems: 'center', padding: '16px 8px', borderBottom: i < 3 ? `1px solid ${cardBorder}` : 'none', opacity: e, transform: `translateY(${(1 - e) * 16}px)`, background: hl ? pillBg : 'transparent', borderRadius: 10 }}>
                    <span style={{ position: 'relative', fontFamily: F, fontWeight: 600, fontSize: 20, color: pal.ink, opacity: isDone ? 0.5 : 1 }}>
                      {task.t}
                      <span style={{ position: 'absolute', left: 0, top: '52%', height: 2.5, width: `${dn * 100}%`, background: pal.accent }} />
                    </span>
                    <span style={{ ...mono, opacity: 0.75 }}>{task.c}</span>
                    <span style={{ ...mono, opacity: 0.75 }}>{task.o}</span>
                    <span style={{ ...mono, opacity: 0.75 }}>{task.d}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, justifySelf: 'start', fontFamily: M, fontSize: 15, borderRadius: 999, padding: '6px 14px', color: isDone ? '#fff' : pal.ink, background: isDone ? pal.accent : (pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.07)'), transform: `scale(${task.done ? 1 + 0.12 * Math.sin(Math.PI * dn) : 1})` }}>
                      {isDone && <svg width="11" height="9" viewBox="0 0 13 11"><polyline points="1.5,5.5 5,9 11.5,1.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      {isDone ? 'Done' : task.s0}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {phase === 3 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.775} size={98} color={pal.ink}>Every obligation — an owner,</Slam>
            <Slam p={p} at={0.795} size={98} color={pal.ink}>a deadline, a paper trail.</Slam>
            <Slam p={p} at={0.815} size={132} color={pal.accent}>Nothing slips.</Slam>
            <div style={{ marginTop: 44 }}>
              <KpiFlip p={p} at={0.825} label="Post-investment follow-up" from="Email chains" to="Shared tracking" />
            </div>
          </div>
        )}
      </div>
    );
  }

  function SLogo() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const e = ez(p, 0.1, 0.2, Easing.easeOutBack);
    const o = ez(p, 0.1, 0.12);
    const e2 = ez(p, 0.4, 0.12);
    const e3 = ez(p, 0.56, 0.12);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
        <img src="assets/perry-logo.png" alt="Perry" style={{ width: 540, opacity: o, transform: `scale(${0.8 + 0.2 * e})`, filter: pal.dark ? 'invert(1)' : 'none' }} />
        <div style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 34, color: pal.ink, opacity: e2 * 0.9, transform: `translateY(${(1 - e2) * 14}px)` }}>One system. Every document.</div>
        <div style={{ fontFamily: M, fontSize: 31, letterSpacing: '0.16em', color: pal.ink, opacity: e3 * 0.85, transform: `translateY(${(1 - e3) * 16}px)` }}>THE LEGAL OS FOR PRIVATE CAPITAL</div>
      </div>
    );
  }

  function PerryIntro() {
    const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
    const pal = t.dark
      ? { ink: '#f2efe8', paper: '#141310', accent: t.accent, dark: true }
      : { ink: '#17150f', paper: '#f6f4ee', accent: t.accent, dark: false };
    return (
      <Pal.Provider value={pal}>
        <div style={{ position: 'fixed', inset: 0, background: pal.paper }}>
          <SceneStage width={1600} height={900} bg={pal.paper} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} soundtrack="assets/a-little-higher.mp3" soundtrackStart={11} soundtrackVolume={0.85}>
            {{ Hook: SHook, Ask: SAsk, NDA: SNda, Patterns: SPatterns, Tracked: STrack, Perry: SLogo }}
          </SceneStage>
        </div>
        <TweaksPanel>
          <TweakSection label="Motion" />
          <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
          <TweakSection label="Look" />
          <TweakColor label="Accent" value={t.accent} options={['#009C7F', '#d9622b', '#2f6bd8', '#8250df']} onChange={(v) => setTweak('accent', v)} />
          <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
        </TweaksPanel>
      </Pal.Provider>
    );
  }
  window.PerryIntro = PerryIntro;
})();
