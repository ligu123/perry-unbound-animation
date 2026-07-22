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
    const e = ez(p, at, 0.04);
    return (
      <div style={{ position: 'absolute', top: 72, left: 110, fontFamily: M, fontSize: 26, letterSpacing: '0.18em', color: pal.ink, opacity: e * 0.9, transform: `translateX(${(1 - e) * -16}px)`, display: 'flex', gap: 20 }}>
        <span style={{ color: pal.accent, fontWeight: 500 }}>{num}</span>
        <span>{text}</span>
      </div>
    );
  }

  function SectionTitle({ p, num, text }) {
    const pal = React.useContext(Pal);
    const e = ez(p, 0.005, 0.028);
    const w = ez(p, 0.02, 0.04);
    return (
      <div style={{ position: 'absolute', top: 130, left: 110 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, opacity: e, transform: `translateY(${(1 - e) * 14}px)` }}>
          <span style={{ fontFamily: T, fontWeight: 600, fontSize: 66, color: pal.accent }}>{num}</span>
          <span style={{ fontFamily: M, fontSize: 31, letterSpacing: '0.24em', color: pal.ink }}>{text}</span>
        </div>
        <div style={{ height: 4, width: 340 * w, background: pal.accent, marginTop: 16, borderRadius: 2 }} />
      </div>
    );
  }

  function Slam({ p, at, dur = 0.045, size = 150, color, style, children }) {
    const raw = clamp((p - at) / dur, 0, 1);
    const e = Easing.easeOutCubic(raw);
    return (
      <div style={{ fontFamily: T, fontWeight: 600, fontSize: size, lineHeight: 1.04, letterSpacing: '-0.01em', color, opacity: raw === 0 ? 0 : Math.min(1, raw * 5), transform: `translateY(${(1 - e) * 28}px) scale(${1.16 - 0.16 * e})`, transformOrigin: 'left bottom', ...style }}>
        {children}
      </div>
    );
  }

  function KpiFlip({ p, at, label, from, to }) {
    const pal = React.useContext(Pal);
    const e1 = ez(p, at, 0.03);
    const st = ez(p, at + 0.025, 0.025);
    const e2 = ez(p, at + 0.045, 0.035, Easing.easeOutBack);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 30, opacity: e1, transform: `translateY(${(1 - e1) * 14}px)` }}>
        <span style={{ fontFamily: M, fontSize: 25, letterSpacing: '0.12em', opacity: 0.62, color: pal.ink, width: 470, textTransform: 'uppercase' }}>{label}</span>
        <span style={{ position: 'relative', fontFamily: M, fontSize: 42, color: pal.ink, opacity: 0.55, whiteSpace: 'nowrap' }}>
          {from}
          <span style={{ position: 'absolute', left: -4, top: '52%', height: 5, width: `${st * 106}%`, background: pal.accent, borderRadius: 3 }} />
        </span>
        <span style={{ fontFamily: M, fontSize: 42, color: pal.ink, opacity: e2 > 0 ? 0.8 : 0 }}>→</span>
        <span style={{ fontFamily: T, fontWeight: 600, fontSize: 58, color: pal.accent, opacity: Math.min(1, e2 * 2.5), transform: `scale(${0.78 + 0.22 * e2})`, display: 'inline-block', transformOrigin: 'left center', whiteSpace: 'nowrap' }}>{to}</span>
      </div>
    );
  }

  function SHook() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const logo = ez(p, 0.03, 0.06);
    const logoPop = ez(p, 0.03, 0.1, Easing.easeOutBack);
    const rule = ez(p, 0.16, 0.05);
    const line = ez(p, 0.22, 0.05);
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
        <Slam p={p} at={0.015} size={size} color={pal.ink}>{l1}</Slam>
        <Slam p={p} at={0.045} size={size} color={pal.accent}>{l2}</Slam>
      </div>
    );
  }

  const QUOTE = [['“Does', 0], ['the', 0], ['SPA', 1], ['require', 0], ['consent', 1], ['for', 0], ['this', 0], ['secondary', 1], ['transfer?”', 0]];
  function Quote({ p, at, words, pre }) {
    const pal = React.useContext(Pal);
    return (
      <div style={{ position: 'absolute', inset: 0, padding: '0 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {pre && <div style={{ fontFamily: M, fontSize: 28, color: pal.ink, opacity: ez(p, Math.max(0, at - 0.03), 0.03) * 0.7, marginBottom: 30 }}>{pre}</div>}
        <div style={{ fontFamily: T, fontWeight: 600, fontSize: 88, lineHeight: 1.18, maxWidth: 1320, letterSpacing: '-0.01em', fontStyle: 'italic' }}>
          {words.map(([w, acc], i) => {
            const e = ez(p, at + i * 0.007, 0.028);
            return <span key={i} style={{ display: 'inline-block', marginRight: '0.26em', opacity: e, transform: `translateY(${(1 - e) * 18}px)`, color: acc ? pal.accent : pal.ink }}>{w}</span>;
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
            <Slam p={p} at={0.73} size={150} color={pal.ink}>Answered.</Slam>
            <Slam p={p} at={0.75} size={150} color={pal.accent}>Cited.<span style={{ display: 'inline-block', fontFamily: M, fontStyle: 'normal', fontSize: 34, fontWeight: 400, color: pal.accent, border: `2px solid ${pal.accent}`, borderRadius: 10, padding: '2px 18px', marginLeft: 26, verticalAlign: '18px' }}>1</span></Slam>
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
    const soft = pal.dark ? 'rgba(242,239,232,0.08)' : 'rgba(16,18,21,0.06)';
    const phase = p < 0.12 ? 0 : p < 0.56 ? 1 : p < 0.8 ? 2 : 3;
    const flowIn = ez(p, 0.13, 0.05);
    const step1 = ez(p, 0.16, 0.06);
    const step2 = ez(p, 0.23, 0.06);
    const chanE = ez(p, 0.27, 0.05);
    const chanS = ez(p, 0.3, 0.05);
    const step3 = ez(p, 0.34, 0.06);
    const arrow1 = ez(p, 0.21, 0.04);
    const arrow2 = ez(p, 0.32, 0.04);
    const docIn = ez(p, 0.58, 0.06);
    const strike1 = ez(p, 0.64, 0.05);
    const strike2 = ez(p, 0.69, 0.05);
    const backIn = ez(p, 0.735, 0.06);
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const MailIcon = ({ size = 22 }) => (
      <svg width={size} height={size * 0.82} viewBox="0 0 22 18"><rect x="1" y="1" width="20" height="16" rx="2.5" fill="none" stroke={pal.ink} strokeWidth="1.6" /><polyline points="1.5,2.5 11,10 20.5,2.5" fill="none" stroke={pal.ink} strokeWidth="1.6" strokeLinejoin="round" /></svg>
    );
    const SlackIcon = ({ size = 20 }) => (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M7.2 12.6a1.8 1.8 0 1 1-1.8-1.8h1.8v1.8Zm.9 0a1.8 1.8 0 1 1 3.6 0v4.5a1.8 1.8 0 1 1-3.6 0v-4.5Z" fill={pal.ink} />
        <path d="M7.4 7.2a1.8 1.8 0 1 1 1.8-1.8v1.8H7.4Zm0 .9a1.8 1.8 0 1 1 0 3.6H2.9a1.8 1.8 0 1 1 0-3.6h4.5Z" fill={pal.ink} />
        <path d="M12.8 7.4a1.8 1.8 0 1 1 1.8 1.8h-1.8V7.4Zm-.9 0a1.8 1.8 0 1 1-3.6 0V2.9a1.8 1.8 0 1 1 3.6 0v4.5Z" fill={pal.ink} />
        <path d="M12.6 12.8a1.8 1.8 0 1 1-1.8 1.8v-1.8h1.8Zm0-.9a1.8 1.8 0 1 1 0-3.6h4.5a1.8 1.8 0 1 1 0 3.6h-4.5Z" fill={pal.ink} />
      </svg>
    );
    const FlowArrow = ({ opacity }) => (
      <div style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity, flexShrink: 0 }}>
        <svg width="36" height="16" viewBox="0 0 36 16"><path d="M2 8 H28 M22 2 L30 8 L22 14" fill="none" stroke={pal.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    );
    const StepCard = ({ opacity, y, num, title, children }) => (
      <div style={{
        width: 300, minHeight: 280, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18,
        boxShadow: '0 18px 44px rgba(16,18,21,0.08)', padding: '26px 24px 28px',
        opacity, transform: `translateY(${(1 - y) * 28}px)`, display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 34, height: 34, borderRadius: 17, background: pal.accent, color: '#fff', fontFamily: M, fontSize: 16, fontWeight: 500, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{num}</span>
          <span style={{ fontFamily: M, fontSize: 15, letterSpacing: '0.14em', color: pal.ink, opacity: 0.55 }}>{title}</span>
        </div>
        {children}
      </div>
    );
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 ? <SectionTitle p={p} num="03" text="NDA AUTOMATION" /> : <Kicker p={p} at={0} num="03" text="NDA AUTOMATION" />}
        {phase === 0 && <HookLines p={p} l1="Another NDA just landed." l2="It's the ninth this week." />}
        {phase === 1 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, opacity: flowIn }}>
            <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 0 }}>
              <StepCard opacity={step1} y={step1} num="1" title="FUND RECEIVES">
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 24, color: pal.ink, lineHeight: 1.25 }}>NDA arrives in the fund inbox</div>
                <div style={{ background: pillBg, borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
                  <span style={{ width: 42, height: 42, borderRadius: 21, background: soft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MailIcon /></span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ ...mono, fontSize: 13, opacity: 0.5, marginBottom: 4 }}>FROM · legal@acmecorp.com</div>
                    <div style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: pal.ink }}>Mutual NDA for signature</div>
                  </div>
                </div>
                <span style={{ ...mono, fontSize: 14, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '7px 14px', alignSelf: 'flex-start' }}>Acme_Mutual_NDA_v3.docx</span>
              </StepCard>
              <FlowArrow opacity={arrow1} />
              <StepCard opacity={step2} y={step2} num="2" title="SEND TO PERRY">
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 24, color: pal.ink, lineHeight: 1.25 }}>Forward by Email or Slack</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, background: pillBg, opacity: chanE, transform: `translateX(${(1 - chanE) * -16}px)`, border: `1.5px solid ${chanE > 0.7 ? pal.accent : 'transparent'}` }}>
                    <span style={{ width: 38, height: 38, borderRadius: 19, background: soft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><MailIcon size={18} /></span>
                    <div>
                      <div style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink }}>Email</div>
                      <div style={{ ...mono, fontSize: 13, opacity: 0.5 }}>nda@perry.legal</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, background: pillBg, opacity: chanS, transform: `translateX(${(1 - chanS) * -16}px)`, border: `1.5px solid ${chanS > 0.7 ? pal.accent : 'transparent'}` }}>
                    <span style={{ width: 38, height: 38, borderRadius: 19, background: soft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><SlackIcon /></span>
                    <div>
                      <div style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink }}>Slack</div>
                      <div style={{ ...mono, fontSize: 13, opacity: 0.5 }}>#legal → @Perry</div>
                    </div>
                  </div>
                </div>
              </StepCard>
              <FlowArrow opacity={arrow2} />
              <StepCard opacity={step3} y={step3} num="3" title="PERRY RETURNS">
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 24, color: pal.ink, lineHeight: 1.25 }}>Review, redline, send back</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                  {[
                    ['Reviews against NDA rules', true],
                    ['Applies tracked redlines', true],
                    ['Returns draft to the fund', true],
                  ].map(([t, on], i) => {
                    const e = ez(p, 0.36 + i * 0.025, 0.04);
                    return (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: e, transform: `translateY(${(1 - e) * 10}px)` }}>
                        <Check on={on && e > 0.55} accent={pal.accent} />
                        <span style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: pal.ink }}>{t}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, opacity: ez(p, 0.42, 0.04) }}>
                  <img src="assets/perry-logo.png" alt="Perry" style={{ height: 18, filter: pal.dark ? 'invert(1)' : 'none' }} />
                  <span style={{ ...mono, fontSize: 14, opacity: 0.5 }}>agent running</span>
                </div>
              </StepCard>
            </div>
            <div style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 26, color: pal.ink, opacity: ez(p, 0.4, 0.035) }}>
              Inbox in. Redline out. <span style={{ color: pal.accent }}>No new tool to open.</span>
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
            <div style={{ width: 900, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 14, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16, opacity: backIn, transform: `translateY(${(1 - backIn) * 14}px)`, boxShadow: '0 12px 32px rgba(16,18,21,0.08)' }}>
              <Check on={backIn > 0.5} accent={pal.accent} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 20, color: pal.ink }}>Redlined draft returned to the fund</div>
                <div style={{ ...mono, fontSize: 15, opacity: 0.55, marginTop: 4 }}>via Email · Slack · changes summarised</div>
              </div>
              <span style={{ ...mono, fontSize: 14, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '7px 14px' }}>→ fund inbox</span>
            </div>
          </div>
        )}
        {phase === 3 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.82} size={122} color={pal.ink}>Reviewed before</Slam>
            <Slam p={p} at={0.835} size={122} color={pal.accent}>you’ve opened the email.</Slam>
            <div style={{ marginTop: 56 }}>
              <KpiFlip p={p} at={0.865} label="NDA review" from="30 min" to="7 min" />
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
            <div style={{ width: 1160, opacity: ez(p, 0.28, 0.035), transform: `translateY(${(1 - ez(p, 0.28, 0.035)) * 10}px)` }}>
              <span style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 27, color: pal.ink }}>Your next term sheet, negotiated from data — <span style={{ color: pal.accent }}>not recollection.</span></span>
            </div>
          </div>
        )}
        {phase === 2 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div>
              <Slam p={p} at={0.77} size={108} color={pal.ink}>One document is an answer.</Slam>
              <Slam p={p} at={0.79} size={108} color={pal.accent}>Two hundred are a strategy.</Slam>
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
    { t: 'Collect signed IP assignment', c: 'Grape Ltd', o: 'External counsel', d: '01 Aug', s0: 'Awaiting signature' },
    { t: 'File SH01 \u2014 share allotment', c: 'Grape Ltd', o: 'J. Whitfield', d: '08 Aug', s0: 'In progress' },
    { t: 'Board consent \u2014 ESOP top-up', c: 'Grape Ltd', o: 'External counsel', d: '15 Aug', s0: 'Waiting on counterparty', focus: true },
    { t: 'Update cap table post-closing', c: 'Grape Ltd', o: 'M. Osei', d: '22 Aug', s0: 'Not started' },
  ];
  const PACK_FILES = [
    'SPA_executed.pdf',
    'SHA_final.pdf',
    'Disclosure_letter.pdf',
    'Ancillary_docs.zip',
  ];

  function TrackChat({ p }) {
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const soft = pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.06)';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const cardIn = ez(p, 0.02, 0.08);
    const packIn = ez(p, 0.12, 0.08);
    const msgIn = ez(p, 0.28, 0.07);
    const searchIn = ez(p, 0.4, 0.06);
    const ansIn = ez(p, 0.5, 0.07);
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1120, height: 660, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${0.96 + 0.04 * cardIn})`, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '32px 48px 18px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: `1px solid ${cardBorder}`, flexShrink: 0 }}>
            <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
            <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>ASSISTANT</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: M, fontSize: 15, color: pal.ink, opacity: 0.45 }}>Grape Ltd · Series A close</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', padding: '28px 48px 32px', position: 'relative' }}>
            <div style={{
              border: `1.5px dashed ${pal.accent}`, borderRadius: 16, padding: '22px 26px', background: pal.dark ? 'rgba(0,156,127,0.08)' : 'rgba(0,156,127,0.05)',
              opacity: packIn, transform: `translateY(${(1 - packIn) * 18}px)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: soft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="20" viewBox="0 0 24 20"><path d="M1.5 3 H9 l2.4 3 H22.5 V18.5 H1.5 Z" fill="none" stroke={pal.ink} strokeWidth="1.7" strokeLinejoin="round" /></svg>
                </span>
                <div>
                  <div style={{ fontFamily: F, fontWeight: 600, fontSize: 20, color: pal.ink }}>Grape_Ltd_Closing_Pack.zip</div>
                  <div style={{ ...mono, fontSize: 14, opacity: 0.5, marginTop: 3 }}>Transaction document package · 4 files</div>
                </div>
                <span style={{ marginLeft: 'auto', fontFamily: M, fontSize: 14, color: pal.accent, fontWeight: 500 }}>Uploaded</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {PACK_FILES.map((f, i) => {
                  const e = ez(p, 0.16 + i * 0.03, 0.05);
                  return (
                    <span key={f} style={{ ...mono, fontSize: 14, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '6px 14px', background: cardBg, opacity: e, transform: `translateY(${(1 - e) * 8}px)` }}>{f}</span>
                  );
                })}
              </div>
            </div>

            <div style={{ background: pillBg, borderRadius: 999, padding: '16px 28px', fontFamily: M, fontSize: 20, color: pal.ink, marginTop: 22, opacity: msgIn, transform: `translateY(${(1 - msgIn) * 14}px)` }}>
              Create a post-close task list from this closing pack
            </div>

            <div style={{ opacity: ansIn, transform: `translateY(${(1 - ansIn) * 16}px)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0 14px', fontFamily: M, fontSize: 16, color: pal.ink, opacity: 0.55 * searchIn }}>
                <span style={{ width: 13, height: 16, border: `1.5px solid ${pal.ink}`, borderRadius: 3, display: 'inline-block' }} />
                Extracted obligations from closing pack
              </div>
              <div style={{ fontFamily: F, fontWeight: 400, fontSize: 21, lineHeight: 1.45, color: pal.ink, marginBottom: 18 }}>
                Created <strong style={{ color: pal.accent }}>4 post-close tasks</strong> for Grape Ltd:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {TASKS.map((task, i) => {
                  const e = ez(p, 0.58 + i * 0.07, 0.06);
                  return (
                    <div key={task.t} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, background: pillBg, opacity: e, transform: `translateY(${(1 - e) * 12}px)` }}>
                      <Check on={e > 0.55} accent={pal.accent} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink }}>{task.t}</div>
                        <div style={{ ...mono, fontSize: 13, opacity: 0.5, marginTop: 3 }}>Due {task.d} · {task.o}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function TaskList({ p }) {
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const cardIn = ez(p, 0.02, 0.08);
    const focusIdx = 2;
    const clickAt = 0.55;
    const hover = ez(p, clickAt - 0.12, 0.08);
    const press = Math.sin(Math.PI * clamp((p - clickAt) / 0.06, 0, 1));
    const curO = Math.min(ez(p, 0.35, 0.06), 1 - ez(p, clickAt + 0.08, 0.05));
    const curX = 420 + 40 * (1 - hover);
    const curY = 318 + focusIdx * 62 + 20 * (1 - hover);
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1180, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '36px 48px 40px', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${0.96 + 0.04 * cardIn})`, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
            <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>TASKS</span>
            <span style={{ flex: 1 }} />
            <span style={{ ...mono, opacity: 0.6 }}>4 open · from closing pack</span>
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.dark ? '#141310' : '#fafafa', background: pal.dark ? '#f2efe8' : '#18181b', borderRadius: 999, padding: '10px 22px' }}>+ New task</span>
          </div>
          <div style={{ ...mono, background: pillBg, borderRadius: 999, padding: '12px 24px', margin: '24px 0 8px', opacity: 0.55 }}>Search tasks…</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px 170px 90px 220px', gap: 14, padding: '14px 8px 10px', borderBottom: `1px solid ${cardBorder}`, fontFamily: M, fontSize: 15, letterSpacing: '0.1em', color: pal.ink, opacity: 0.5 }}>
            <span>TASK</span><span>COMPANY</span><span>OWNER</span><span>DUE</span><span>STATUS</span>
          </div>
          {TASKS.map((task, i) => {
            const e = ez(p, 0.12 + i * 0.06, 0.06);
            const isFocus = i === focusIdx && p >= clickAt - 0.1;
            const hl = isFocus ? Math.max(hover, press) : 0;
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 130px 170px 90px 220px', gap: 14, alignItems: 'center',
                padding: '16px 8px', borderBottom: i < 3 ? `1px solid ${cardBorder}` : 'none',
                opacity: e, transform: `translateY(${(1 - e) * 16}px) scale(${1 - 0.015 * press * (i === focusIdx ? 1 : 0)})`,
                background: hl > 0.2 ? pillBg : 'transparent', borderRadius: 10,
                boxShadow: i === focusIdx && press > 0.2 ? `inset 0 0 0 1.5px ${pal.accent}` : 'none',
              }}>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 20, color: pal.ink }}>{task.t}</span>
                <span style={{ ...mono, opacity: 0.75 }}>{task.c}</span>
                <span style={{ ...mono, opacity: 0.75 }}>{task.o}</span>
                <span style={{ ...mono, opacity: 0.75 }}>{task.d}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, justifySelf: 'start', fontFamily: M, fontSize: 15, borderRadius: 999, padding: '6px 14px', color: pal.ink, background: pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.07)' }}>
                  {task.s0}
                </span>
              </div>
            );
          })}
          <Cursor x={curX} y={curY} opacity={curO} />
        </div>
      </div>
    );
  }

  function TaskDetail({ p }) {
    const pal = React.useContext(Pal);
    const { localTime } = useScene();
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const cardIn = ez(p, 0.02, 0.08);
    const TYPE1 = '@El';
    const n1 = Math.round(clamp((p - 0.18) / 0.06, 0, 1) * TYPE1.length);
    const dropVis = Math.min(ez(p, 0.24, 0.05), 1 - ez(p, 0.38, 0.04));
    const mentioned = p >= 0.4;
    const REST = ' could you circulate the board consent for signature this week?';
    const restIn = ez(p, 0.42, 0.06);
    const posted = p >= 0.62;
    const notified = ez(p, 0.68, 0.05);
    const caret = !posted && p >= 0.14 && Math.floor(localTime * 2.5) % 2 === 0;
    const press = 1 - 0.08 * Math.sin(Math.PI * clamp((p - 0.58) / 0.04, 0, 1));
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
    // 0 hook · 1 chat upload+tasks · 2 task list click · 3 @mention detail · 4 payoff
    const phase = p < 0.1 ? 0 : p < 0.4 ? 1 : p < 0.55 ? 2 : p < 0.8 ? 3 : 4;
    const local = (a, b) => clamp((p - a) / (b - a), 0, 1);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 ? <SectionTitle p={p} num="04" text="POST-CLOSE TRACKING" /> : <Kicker p={p} at={0} num="04" text="POST-CLOSE TRACKING" />}
        {phase === 0 && <HookLines p={p} size={124} l1="The deal closed." l2="The work didn't." />}
        {phase === 1 && <TrackChat p={local(0.1, 0.4)} />}
        {phase === 2 && <TaskList p={local(0.4, 0.55)} />}
        {phase === 3 && <TaskDetail p={local(0.55, 0.8)} />}
        {phase === 4 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.82} size={98} color={pal.ink}>Every obligation — an owner,</Slam>
            <Slam p={p} at={0.835} size={98} color={pal.ink}>a deadline, a paper trail.</Slam>
            <Slam p={p} at={0.85} size={132} color={pal.accent}>Nothing slips.</Slam>
            <div style={{ marginTop: 44 }}>
              <KpiFlip p={p} at={0.875} label="Post-investment follow-up" from="Email chains" to="Shared tracking" />
            </div>
          </div>
        )}
      </div>
    );
  }

  function SClose() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Slam p={p} at={0.06} size={72} color={pal.ink}>General legal AI completes a single task faster.</Slam>
        <Slam p={p} at={0.16} size={88} color={pal.accent}>Perry runs the fund for you.</Slam>
      </div>
    );
  }

  function SLogo() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const e = ez(p, 0.08, 0.12, Easing.easeOutBack);
    const o = ez(p, 0.08, 0.06);
    const e2 = ez(p, 0.32, 0.06);
    const e3 = ez(p, 0.44, 0.06);
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
            {{ Hook: SHook, Ask: SAsk, NDA: SNda, Patterns: SPatterns, Tracked: STrack, Close: SClose, Perry: SLogo }}
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
