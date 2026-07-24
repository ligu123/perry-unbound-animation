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
    const e = ez(p, at, 0.06);
    return (
      <div style={{
        position: 'absolute', top: 56, left: 110, zIndex: 5,
        fontFamily: M, letterSpacing: '0.16em', color: pal.ink,
        opacity: e, transform: `translateY(${(1 - e) * 10}px)`,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <span style={{ fontFamily: T, fontWeight: 600, fontSize: 34, color: pal.accent, letterSpacing: '0.02em' }}>{num}</span>
        <span style={{ fontSize: 22, opacity: 0.85 }}>{text}</span>
      </div>
    );
  }

  function SectionTitle({ p, num, text, until = 0.11 }) {
    const pal = React.useContext(Pal);
    const e = ez(p, 0.02, 0.07);
    const fade = 1 - ez(p, until - 0.025, 0.025);
    const o = e * fade;
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: o, transform: `translateY(${(1 - e) * 22}px)`,
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
          <span style={{ fontFamily: T, fontWeight: 600, fontSize: 120, color: pal.accent }}>{num}</span>
          <span style={{ fontFamily: M, fontSize: 44, letterSpacing: '0.22em', color: pal.ink }}>{text}</span>
        </div>
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
    const site = ez(p, 0.32, 0.05);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="assets/perry-logo.png" alt="Perry" style={{ width: 620, opacity: logo, transform: `scale(${0.85 + 0.15 * logoPop})`, filter: pal.dark ? 'invert(1)' : 'none' }} />
        <div style={{ height: 4, width: 520 * rule, background: pal.accent, borderRadius: 2, margin: '46px 0 34px' }} />
        <div style={{ fontFamily: T, fontWeight: 600, fontSize: 48, color: pal.accent, opacity: line, transform: `translateY(${(1 - line) * 14}px)`, textAlign: 'center' }}>Meet the legal OS for private capital</div>
        <div style={{ fontFamily: M, fontSize: 28, letterSpacing: '0.14em', color: pal.ink, opacity: site * 0.85, transform: `translateY(${(1 - site) * 12}px)`, marginTop: 28 }}>useperry.com</div>
      </div>
    );
  }

  function HookLines({ p, l1, l2, size = 104, at = 0.13 }) {
    const pal = React.useContext(Pal);
    return (
      <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Slam p={p} at={at} size={size} color={pal.ink}>{l1}</Slam>
        <Slam p={p} at={at + 0.06} size={size} color={pal.accent}>{l2}</Slam>
      </div>
    );
  }

  const QUOTE = [['“Are', 0], ['any', 0], ['LPs', 1], ['excluded', 1], ['from', 0], ['investments', 0], ['in', 0], ['the', 0], ['Philippines?”', 1]];
  function Quote({ p, at, words, pre }) {
    const pal = React.useContext(Pal);
    return (
      <div style={{ position: 'absolute', inset: 0, padding: '0 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {pre && <div style={{ fontFamily: M, fontSize: 28, color: pal.ink, opacity: ez(p, Math.max(0, at - 0.03), 0.03) * 0.7, marginBottom: 30 }}>{pre}</div>}
        <div style={{ fontFamily: T, fontWeight: 600, fontSize: 72, lineHeight: 1.18, maxWidth: 1380, letterSpacing: '-0.01em', fontStyle: 'italic' }}>
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

  function AskAgentWork({ p }) {
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 15, color: pal.ink };
    const cardIn = ez(p, 0.02, 0.08);
    const qIn = ez(p, 0.1, 0.06);
    const sweep = ez(p, 0.2, 0.12);
    const outIn = ez(p, 0.76, 0.06);
    const docs = [
      { at: 0.22, kind: 'SIDE LETTER', name: 'Alpha Capital — Side Letter', clause: 'Excluded jurisdictions · ASEAN', hit: true, excerpt: '…shall not be required to participate in investments in the Philippines…' },
      { at: 0.34, kind: 'SIDE LETTER', name: 'Meridian LP — Side Letter', clause: 'Geographic carve-outs', hit: true, excerpt: '…excused from any investment in the Philippines…' },
      { at: 0.46, kind: 'SIDE LETTER', name: 'Northwind Partners — Side Letter', clause: 'Geographic carve-outs', hit: true, excerpt: '…opt-out for Philippines and Indonesia…' },
      { at: 0.58, kind: 'LPA', name: 'Fund LPA — Sch. 3', clause: 'Investment Restrictions', hit: false, excerpt: 'Base restricted list · LP side letters may add further exclusions' },
      { at: 0.7, kind: 'LPA', name: 'Fund LPA — cl. 8.4', clause: 'Excuse rights', hit: false, excerpt: 'Excuse mechanics referenced · no Philippines default' },
    ];
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '118px 56px 36px' }}>
        <div style={{
          width: 1240, maxHeight: '100%', background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18,
          boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '28px 40px 30px',
          opacity: cardIn, transform: `translateY(${(1 - cardIn) * 36}px) scale(${0.96 + 0.04 * cardIn})`,
          display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexShrink: 0 }}>
            <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
            <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>AGENT</span>
            <span style={{ ...mono, fontSize: 14, opacity: 0.45, marginLeft: 4 }}>searching corpus</span>
            <span style={{ flex: 1 }} />
            <span style={{ ...mono, fontSize: 14, color: pal.accent, opacity: sweep }}>side letters · LPA</span>
          </div>

          <div style={{
            background: pillBg, borderRadius: 12, padding: '14px 20px', marginBottom: 16, flexShrink: 0,
            opacity: qIn, transform: `translateY(${(1 - qIn) * 12}px)`,
          }}>
            <div style={{ ...mono, fontSize: 12, opacity: 0.5, marginBottom: 4, letterSpacing: '0.12em' }}>USER</div>
            <div style={{ fontFamily: F, fontWeight: 600, fontSize: 20, color: pal.ink }}>Are any LPs excluded from investments in the Philippines?</div>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexShrink: 0,
            opacity: ez(p, 0.18, 0.06),
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: pal.accent }} />
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: pal.ink }}>Reading side letters and LPA clauses…</span>
            <span style={{ ...mono, fontSize: 13, opacity: 0.5 }}>5 documents in scope</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minHeight: 0, overflow: 'hidden' }}>
            {docs.map((d) => {
              const e = ez(p, d.at, 0.08);
              const done = e >= 0.55;
              const scanning = e > 0.15 && e < 0.55;
              return (
                <div key={d.name} style={{
                  display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 14, alignItems: 'center',
                  padding: '12px 16px', borderRadius: 12,
                  border: `1px solid ${done && d.hit ? pal.accent : cardBorder}`,
                  background: done && d.hit ? (pal.dark ? 'rgba(0,156,127,0.1)' : 'rgba(0,156,127,0.06)') : pillBg,
                  opacity: Math.max(0.25, e),
                  transform: `translateX(${(1 - e) * 20}px)`,
                }}>
                  <span style={{
                    fontFamily: M, fontSize: 11, letterSpacing: '0.1em', borderRadius: 999, padding: '4px 10px', textAlign: 'center',
                    color: d.kind === 'LPA' ? pal.accent : pal.ink,
                    background: d.kind === 'LPA' ? (pal.dark ? 'rgba(0,156,127,0.16)' : 'rgba(0,156,127,0.1)') : (pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.06)'),
                  }}>{d.kind}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: pal.ink }}>{d.name}</div>
                    <div style={{ ...mono, fontSize: 12, opacity: 0.5, marginTop: 2 }}>{d.clause}</div>
                    {(done || scanning) && (
                      <div style={{
                        fontFamily: F, fontStyle: 'italic', fontSize: 14, color: pal.ink, opacity: done ? 0.75 : 0.45,
                        marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{d.excerpt}</div>
                    )}
                  </div>
                  <span style={{
                    fontFamily: M, fontSize: 12, letterSpacing: '0.08em', borderRadius: 999, padding: '5px 11px', whiteSpace: 'nowrap',
                    color: done ? (d.hit ? '#fff' : pal.ink) : (scanning ? pal.accent : pal.ink),
                    background: done ? (d.hit ? pal.accent : (pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.06)')) : 'transparent',
                    border: scanning ? `1px solid ${pal.accent}` : '1px solid transparent',
                    opacity: done || scanning ? 1 : 0.4,
                  }}>{done ? (d.hit ? 'HIT' : 'CLEAR') : scanning ? 'READING' : 'QUEUED'}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, opacity: outIn, transform: `translateY(${(1 - outIn) * 12}px)`, flexShrink: 0 }}>
            <Check on={outIn > 0.55} accent={pal.accent} />
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink }}>3 LP exclusions found · 2 docs clear</span>
            <span style={{ ...mono, fontSize: 13, opacity: 0.5 }}>→ composing cited answer</span>
          </div>
        </div>
      </div>
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
    const cardIn = ez(p, 0.02, 0.08);
    const reveal = ez(p, 0.12, 0.08);
    const scroll = Math.min(maxScroll, 130 * ez(p, 0.22, 0.08) + 430 * ez(p, 0.58, 0.1));
    const move = ez(p, 0.3, 0.08);
    const curX = bp.x + 300 * (1 - move) + 13;
    const curY = bp.y + 230 * (1 - move) - 2;
    const curO = ez(p, 0.3, 0.05) * (1 - ez(p, 0.55, 0.05));
    const hover = p >= 0.4 && p < 0.62;
    const popVis = Math.min(ez(p, 0.42, 0.06), 1 - ez(p, 0.6, 0.06));
    const zoom = 1 + 0.09 * Math.min(ez(p, 0.35, 0.08), 1 - ez(p, 0.62, 0.08));
    const h2 = { fontFamily: T, fontWeight: 600, fontSize: 28, color: pal.ink, margin: '28px 0 12px' };
    const body = { fontFamily: F, fontWeight: 400, fontSize: 20, lineHeight: 1.55, color: pal.ink, opacity: 0.92 };
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
            <span style={{ fontFamily: M, fontSize: 15, color: pal.ink, opacity: 0.45 }}>Fund I · LP corpus</span>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 80, bottom: 0, overflow: 'hidden' }}>
            <div ref={colRef} style={{ position: 'absolute', left: 48, right: 48, top: 0, transform: `translateY(${24 - scroll}px)` }}>
              <div style={{ background: pillBg, borderRadius: 999, padding: '18px 30px', fontFamily: M, fontSize: 20, color: pal.ink }}>
                Are any LPs excluded from investments in the Philippines?
              </div>
              <div style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 16}px)` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '24px 0 6px', fontFamily: M, fontSize: 17, color: pal.ink, opacity: 0.55 }}>
                  <span style={{ width: 13, height: 16, border: `1.5px solid ${pal.ink}`, borderRadius: 3, display: 'inline-block' }} />
                  Searched side letters + LPA · 5 documents · 3 exclusions
                </div>
                <div style={{ ...body, margin: '14px 0 4px' }}>Yes — <strong>three LPs</strong> have Philippines exclusions in their side letters:</div>
                <div style={h2}>Alpha Capital — Side Letter</div>
                <div style={body}>
                  Alpha is not required to participate in investments in the <strong>Philippines</strong>. The carve-out sits in the excluded-jurisdictions schedule.{badge('1', hover, badgeRef)}
                </div>
                <div style={h2}>Meridian LP — Side Letter</div>
                <div style={body}>
                  Meridian is excused from any investment in the <strong>Philippines</strong> under its geographic carve-outs.{badge('2', false, null)}
                </div>
                <div style={h2}>Northwind Partners — Side Letter</div>
                <div style={body}>
                  Northwind holds an opt-out for <strong>Philippines and Indonesia</strong> under geographic investment restrictions.{badge('3', false, null)}
                </div>
              </div>
              <div style={{ position: 'absolute', left: Math.max(0, bp.x - 450), top: bp.y + 22, width: 440, background: cardBg, border: `1px solid ${cardBorder}`, borderLeft: `3px solid ${pal.accent}`, borderRadius: 12, boxShadow: '0 16px 40px rgba(16,18,21,0.18)', padding: '20px 24px', opacity: popVis, transform: `translateY(${(1 - popVis) * 10}px)`, zIndex: 20 }}>
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink, lineHeight: 1.4 }}>Alpha Capital — Side Letter.docx</div>
                <div style={{ fontFamily: M, fontSize: 15, color: pal.accent, margin: '8px 0 10px' }}>Excluded jurisdictions · Philippines</div>
                <div style={{ fontFamily: F, fontStyle: 'italic', fontSize: 16.5, lineHeight: 1.55, color: pal.ink, opacity: 0.85 }}>
                  “The Limited Partner shall not be required to participate in any Portfolio Investment located in the Philippines…”
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
    // 0 title+quote · 1 agent backend work · 2 answer UI · 3 payoff
    const TITLE = 0.11;
    const phase = p < 0.347 ? 0 : p < 0.587 ? 1 : p < 0.78 ? 2 : 3;
    const local = (a, b) => clamp((p - a) / (b - a), 0, 1);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 && p < TITLE
          ? <SectionTitle p={p} num="02" text="ASK ANYTHING" until={TITLE} />
          : <Kicker p={p} at={phase === 0 ? TITLE : 0.02} num="02" text="ASK ANYTHING" />}
        {phase === 0 && p >= TITLE - 0.02 && <Quote p={p} at={0.14} words={QUOTE} />}
        {phase === 1 && <AskAgentWork p={local(0.347, 0.587)} />}
        {phase === 2 && <AnswerDoc p={local(0.587, 0.78)} pal={pal} />}
        {phase === 3 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.8} size={150} color={pal.ink}>Asked.</Slam>
            <Slam p={p} at={0.82} size={150} color={pal.ink}>Answered.</Slam>
            <Slam p={p} at={0.84} size={150} color={pal.accent}>Cited.<span style={{ display: 'inline-block', fontFamily: M, fontStyle: 'normal', fontSize: 34, fontWeight: 400, color: pal.accent, border: `2px solid ${pal.accent}`, borderRadius: 10, padding: '2px 18px', marginLeft: 26, verticalAlign: '18px' }}>1</span></Slam>
            <div style={{ marginTop: 52 }}>
              <KpiFlip p={p} at={0.87} label="Deal question" from="2 hrs" to="4 min" />
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

  function NdaCustomize({ p }) {
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const shell = ez(p, 0.04, 0.08);
    const titleIn = ez(p, 0.1, 0.07);
    const stepA = ez(p, 0.22, 0.08);
    const stepB = ez(p, 0.4, 0.08);
    const rules = [
      { id: '04', title: 'Term cap', detail: 'Confidentiality ≤ two (2) years', at: 0.55 },
      { id: '07', title: 'Governing law', detail: 'England and Wales only', at: 0.62 },
      { id: '09', title: 'Mutual form', detail: 'Reject one-way NDAs', at: 0.69 },
    ];
    const done = ez(p, 0.72, 0.07);
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 14, padding: '118px 70px 28px' }}>
        <div style={{
          width: 1100, maxHeight: '100%', background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18,
          boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '22px 32px 24px',
          opacity: shell, transform: `translateY(${(1 - shell) * 28}px)`,
          display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexShrink: 0 }}>
            <img src="assets/perry-logo.png" alt="Perry" style={{ height: 20, filter: pal.dark ? 'invert(1)' : 'none' }} />
            <span style={{ fontFamily: M, fontSize: 16, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>PLAYBOOK</span>
            <span style={{ flex: 1 }} />
            <span style={{ ...mono, fontSize: 13, opacity: 0.5 }}>NDA review · customised · tested</span>
          </div>
          <div style={{ opacity: titleIn, transform: `translateY(${(1 - titleIn) * 12}px)`, marginBottom: 14, flexShrink: 0 }}>
            <div style={{ fontFamily: T, fontWeight: 600, fontSize: 30, color: pal.ink, lineHeight: 1.15, marginBottom: 8 }}>
              A Perry lawyer sits with your team — <span style={{ color: pal.accent }}>then we prove it works</span>
            </div>
            <div style={{ fontFamily: F, fontSize: 16, lineHeight: 1.4, color: pal.ink, opacity: 0.72, maxWidth: 880 }}>
              Encode your negotiated positions together. Run evaluation NDAs before go-live. Only drafts outside the playbook escalate to your legal team.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, flexShrink: 0 }}>
            <div style={{
              padding: '12px 14px', borderRadius: 12, border: `1px solid ${stepA > 0.55 ? pal.accent : cardBorder}`,
              background: stepA > 0.55 ? (pal.dark ? 'rgba(0,156,127,0.1)' : 'rgba(0,156,127,0.06)') : pillBg,
              opacity: Math.max(0.35, stepA), transform: `translateY(${(1 - stepA) * 10}px)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: M, fontSize: 11, letterSpacing: '0.12em', color: pal.accent }}>01 · WORKSHOP</span>
                <span style={{ flex: 1 }} />
                <Check on={stepA > 0.65} accent={pal.accent} />
              </div>
              <div style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: pal.ink, marginBottom: 4 }}>Perry lawyer × your company counsel</div>
              <div style={{ ...mono, fontSize: 12, opacity: 0.55, lineHeight: 1.35 }}>Sit together once. Capture positions into the Fund NDA playbook.</div>
            </div>
            <div style={{
              padding: '12px 14px', borderRadius: 12, border: `1px solid ${stepB > 0.55 ? pal.accent : cardBorder}`,
              background: stepB > 0.55 ? (pal.dark ? 'rgba(0,156,127,0.1)' : 'rgba(0,156,127,0.06)') : pillBg,
              opacity: Math.max(0.35, stepB), transform: `translateY(${(1 - stepB) * 10}px)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: M, fontSize: 11, letterSpacing: '0.12em', color: pal.accent }}>02 · EVALUATION</span>
                <span style={{ flex: 1 }} />
                <Check on={stepB > 0.65} accent={pal.accent} />
              </div>
              <div style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: pal.ink, marginBottom: 4 }}>Test before real NDAs</div>
              <div style={{ ...mono, fontSize: 12, opacity: 0.55, lineHeight: 1.35 }}>Run sample NDAs against the playbook. Tune rules until deviations look right.</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
            {rules.map((r) => {
              const e = ez(p, r.at, 0.06);
              return (
                <div key={r.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10,
                  background: pillBg, border: `1px solid ${e > 0.55 ? pal.accent : cardBorder}`,
                  opacity: e, transform: `translateY(${(1 - e) * 8}px)`,
                }}>
                  <span style={{
                    width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: e > 0.55 ? pal.accent : (pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.07)'),
                    color: e > 0.55 ? '#fff' : pal.ink, fontFamily: M, fontSize: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>{r.id}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: pal.ink }}>{r.title}</div>
                    <div style={{ ...mono, fontSize: 12, opacity: 0.55, marginTop: 2 }}>{r.detail}</div>
                  </div>
                  <Check on={e > 0.65} accent={pal.accent} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, opacity: done, flexShrink: 0 }}>
            <Check on={done > 0.55} accent={pal.accent} />
            <span style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: pal.ink }}>Playbook live — only outliers go to your legal team</span>
          </div>
        </div>
        <div style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 22, color: pal.ink, opacity: ez(p, 0.76, 0.06), textAlign: 'center', flexShrink: 0 }}>
          Your positions, encoded once, <span style={{ color: pal.accent }}>applied everytime</span>
        </div>
      </div>
    );
  }

  function SNda() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const soft = pal.dark ? 'rgba(242,239,232,0.08)' : 'rgba(16,18,21,0.06)';
    // 0 hook · 1 customise playbook · 2 three-step flow · 3 redline + issues · 4 payoff
    const TITLE = 0.11;
    const phase = p < 0.28 ? 0 : p < 0.505 ? 1 : p < 0.685 ? 2 : p < 0.835 ? 3 : 4;
    const local = (a, b) => clamp((p - a) / (b - a), 0, 1);
    const fp = local(0.505, 0.685);
    const rp = local(0.685, 0.835);
    const flowIn = ez(fp, 0.04, 0.1);
    const step1 = ez(fp, 0.1, 0.12);
    const step2 = ez(fp, 0.28, 0.12);
    const chanE = ez(fp, 0.38, 0.1);
    const chanS = ez(fp, 0.48, 0.1);
    const step3 = ez(fp, 0.55, 0.12);
    const arrow1 = ez(fp, 0.22, 0.08);
    const arrow2 = ez(fp, 0.48, 0.08);
    const docIn = ez(rp, 0.02, 0.08);
    const panelIn = ez(rp, 0.08, 0.09);
    const strike1 = ez(rp, 0.16, 0.09);
    const issue1 = ez(rp, 0.18, 0.09);
    const strike2 = ez(rp, 0.36, 0.09);
    const issue2 = ez(rp, 0.38, 0.09);
    const backIn = ez(rp, 0.52, 0.08);
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
        width: 318, minHeight: 340, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18,
        boxShadow: '0 18px 44px rgba(16,18,21,0.08)', padding: '24px 22px 26px',
        opacity, transform: `translateY(${(1 - y) * 28}px)`, display: 'flex', flexDirection: 'column', gap: 14,
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
        {phase === 0 && p < TITLE
          ? <SectionTitle p={p} num="03" text="NDA AUTOMATION" until={TITLE} />
          : <Kicker p={p} at={phase === 0 ? TITLE : 0} num="03" text="NDA AUTOMATION" />}
        {phase === 0 && <HookLines p={p} size={72} l1="What happens when another NDA lands," l2="and it’s the ninth this week." />}
        {phase === 1 && <NdaCustomize p={local(0.28, 0.505)} />}
        {phase === 2 && (
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
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 22, color: pal.ink, lineHeight: 1.25 }}>Reviews on your custom rules</div>
                <div style={{
                  marginTop: 2, padding: '10px 12px', borderRadius: 10, background: pal.dark ? 'rgba(0,156,127,0.12)' : 'rgba(0,156,127,0.08)',
                  border: `1px solid ${pal.accent}`, opacity: ez(fp, 0.62, 0.08),
                }}>
                  <div style={{ ...mono, fontSize: 12, letterSpacing: '0.12em', color: pal.accent, marginBottom: 4 }}>RULE SET · BUILT WITH YOUR TEAM</div>
                  <div style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: pal.ink, lineHeight: 1.3 }}>Fund NDA playbook · 12 rules</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 2 }}>
                  {[
                    ['Applies your negotiated positions', true],
                    ['Auto-redlines inside the playbook', true],
                    ['Only outliers escalate to your team', true],
                  ].map(([t, on], i) => {
                    const e = ez(fp, 0.62 + i * 0.04, 0.06);
                    return (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: e, transform: `translateY(${(1 - e) * 10}px)` }}>
                        <Check on={on && e > 0.55} accent={pal.accent} />
                        <span style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: pal.ink }}>{t}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, opacity: ez(fp, 0.74, 0.06) }}>
                  <img src="assets/perry-logo.png" alt="Perry" style={{ height: 18, filter: pal.dark ? 'invert(1)' : 'none' }} />
                  <span style={{ ...mono, fontSize: 13, opacity: 0.5 }}>legal team on exceptions only</span>
                </div>
              </StepCard>
            </div>
            <div style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 26, color: pal.ink, opacity: ez(fp, 0.72, 0.06), textAlign: 'center', maxWidth: 1100 }}>
              In-playbook NDAs run alone. <span style={{ color: pal.accent }}>Only outliers go to your team.</span>
            </div>
          </div>
        )}
        {phase === 3 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 14, padding: '118px 56px 36px' }}>
            <div style={{ width: 1420, display: 'flex', gap: 28, alignItems: 'stretch', flex: 1, minHeight: 0 }}>
              <div style={{ flex: '1 1 820px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', opacity: docIn, flexShrink: 0 }}>
                  <span style={{ ...mono, opacity: 0.6 }}>Acme_Mutual_NDA_v3_redline.docx</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontFamily: M, fontSize: 14, color: '#fff', background: '#C43D3D', borderRadius: 999, padding: '5px 12px' }}>2 tracked changes</span>
                </div>
                <div style={{
                  flex: 1, minHeight: 0, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 12,
                  boxShadow: '0 24px 60px rgba(16,18,21,0.12)', padding: '28px 44px 32px',
                  opacity: docIn, transform: `translateY(${(1 - docIn) * 36}px)`,
                }}>
                  <div style={{ fontFamily: T, fontWeight: 600, fontSize: 18, letterSpacing: '0.08em', textAlign: 'center', color: pal.ink, marginBottom: 18 }}>MUTUAL NON-DISCLOSURE AGREEMENT</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                    {[100, 94, 62].map((w, i) => <div key={i} style={{ height: 7, width: `${w}%`, borderRadius: 4, background: pal.ink, opacity: 0.1 }} />)}
                  </div>
                  <div style={{ position: 'relative', fontFamily: T, fontSize: 16, lineHeight: 1.65, color: pal.ink }}>
                    <span style={{ position: 'absolute', left: -24, top: 3, bottom: 3, width: 3, background: pal.accent, opacity: strike1 }} />
                    <strong>3. Term.</strong> This Agreement shall remain in force for a period of <Redline strike={strike1} to="two (2) years" accent={pal.accent}>five (5) years</Redline> from the Effective Date, unless earlier terminated in accordance with clause 8.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, margin: '16px 0' }}>
                    {[97, 88].map((w, i) => <div key={i} style={{ height: 7, width: `${w}%`, borderRadius: 4, background: pal.ink, opacity: 0.1 }} />)}
                  </div>
                  <div style={{ position: 'relative', fontFamily: T, fontSize: 16, lineHeight: 1.65, color: pal.ink }}>
                    <span style={{ position: 'absolute', left: -24, top: 3, bottom: 3, width: 3, background: pal.accent, opacity: strike2 }} />
                    <strong>9. Governing Law.</strong> This Agreement shall be governed by the laws of <Redline strike={strike2} to="England and Wales" accent={pal.accent}>the State of New York</Redline>, and the parties submit to the exclusive jurisdiction of its courts.
                  </div>
                </div>
              </div>

              <div style={{
                width: 420, flexShrink: 0, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16,
                boxShadow: '0 24px 60px rgba(16,18,21,0.12)', overflow: 'hidden',
                opacity: panelIn, transform: `translateX(${(1 - panelIn) * 36}px)`,
                display: 'flex', flexDirection: 'column', minHeight: 0,
              }}>
                <div style={{ padding: '16px 20px 14px', borderBottom: `1px solid ${cardBorder}`, flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <img src="assets/perry-logo.png" alt="Perry" style={{ height: 18, filter: pal.dark ? 'invert(1)' : 'none' }} />
                    <span style={{ fontFamily: M, fontSize: 13, letterSpacing: '0.14em', color: pal.ink, opacity: 0.5 }}>DEVIATION ALERTS</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ ...mono, fontSize: 12, color: pal.accent }}>Fund playbook</span>
                  </div>
                  <div style={{ fontFamily: F, fontSize: 14, lineHeight: 1.35, color: pal.ink, opacity: 0.7 }}>
                    Flags anything outside the fund’s pre-agreed standards
                  </div>
                </div>
                <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    ...mono, fontSize: 13, opacity: 0.5 * (1 - issue1),
                    position: 'absolute', left: 18, right: 18, top: 20,
                  }}>
                    Scanning draft vs 12 fund standards…
                  </div>
                  {[
                    {
                      e: issue1,
                      n: '01',
                      severity: 'OUTSIDE STANDARD',
                      rule: 'Rule 04 · Term cap',
                      title: 'Term exceeds pre-agreed maximum',
                      draft: 'five (5) years',
                      standard: '≤ two (2) years',
                    },
                    {
                      e: issue2,
                      n: '02',
                      severity: 'OUTSIDE STANDARD',
                      rule: 'Rule 07 · Governing law',
                      title: 'Governing law off fund policy',
                      draft: 'State of New York',
                      standard: 'England & Wales',
                    },
                  ].map((d) => (
                    <div key={d.n} style={{
                      border: `1px solid ${d.e > 0.55 ? '#C43D3D' : cardBorder}`,
                      borderLeft: `3px solid ${d.e > 0.55 ? '#C43D3D' : cardBorder}`,
                      borderRadius: 12, padding: '12px 12px 13px',
                      background: d.e > 0.55 ? (pal.dark ? 'rgba(196,61,61,0.1)' : 'rgba(196,61,61,0.05)') : pillBg,
                      opacity: d.e,
                      transform: `translateY(${(1 - d.e) * 16}px)`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: M, fontSize: 11, letterSpacing: '0.1em', color: '#fff',
                          background: '#C43D3D', borderRadius: 999, padding: '3px 9px',
                        }}>{d.severity}</span>
                        <span style={{ ...mono, fontSize: 11, opacity: 0.5 }}>· {d.n}</span>
                      </div>
                      <div style={{ fontFamily: T, fontWeight: 600, fontSize: 16, color: pal.ink, lineHeight: 1.25, marginBottom: 4 }}>{d.title}</div>
                      <div style={{ ...mono, fontSize: 11, color: pal.accent, marginBottom: 10 }}>{d.rule}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div style={{ borderRadius: 8, padding: '8px 10px', background: pal.dark ? 'rgba(242,239,232,0.06)' : 'rgba(16,18,21,0.04)' }}>
                          <div style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', opacity: 0.45, marginBottom: 4 }}>IN DRAFT</div>
                          <div style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: '#C43D3D', textDecoration: 'line-through', lineHeight: 1.3 }}>{d.draft}</div>
                        </div>
                        <div style={{ borderRadius: 8, padding: '8px 10px', background: pal.dark ? 'rgba(0,156,127,0.12)' : 'rgba(0,156,127,0.08)' }}>
                          <div style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', color: pal.accent, marginBottom: 4 }}>FUND STANDARD</div>
                          <div style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: pal.accent, lineHeight: 1.3 }}>{d.standard}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, opacity: d.e > 0.7 ? 1 : 0 }}>
                        <Check on={d.e > 0.75} accent={pal.accent} />
                        <span style={{ ...mono, fontSize: 11, color: pal.accent }}>Deviation flagged · auto-redlined</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              width: 1420, flexShrink: 0, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 14,
              padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 16,
              opacity: backIn, transform: `translateY(${(1 - backIn) * 14}px)`, boxShadow: '0 12px 32px rgba(16,18,21,0.08)',
            }}>
              <Check on={backIn > 0.5} accent={pal.accent} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink }}>2 deviations corrected to fund standard</div>
                <div style={{ ...mono, fontSize: 14, opacity: 0.55, marginTop: 3 }}>via Email · Slack · redlined draft returned</div>
              </div>
              <span style={{ ...mono, fontSize: 13, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '6px 12px' }}>→ fund inbox</span>
            </div>
          </div>
        )}
        {phase === 4 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.85} size={88} color={pal.ink}>Perry knows your playbook.</Slam>
            <Slam p={p} at={0.865} size={88} color={pal.accent}>Redline without the back and forth.</Slam>
            <div style={{ marginTop: 56 }}>
              <KpiFlip p={p} at={0.89} label="NDA review" from="30 min" to="7 min" />
            </div>
          </div>
        )}
      </div>
    );
  }

  const PORTFOLIO_PREFS = [
    { co: 'Orange Ltd', doc: 'Series A AoA', term: '1.5× senior preference', hot: true },
    { co: 'Grape Ltd', doc: 'Seed AoA', term: '1.5× senior preference', hot: true },
  ];

  function PatternsBackend({ p }) {
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const shell = ez(p, 0.04, 0.08);
    const qIn = ez(p, 0.12, 0.06);
    const graphIn = ez(p, 0.18, 0.08);
    const search = ez(p, 0.38, 0.14);
    const steps = [
      { label: 'INDEX', detail: 'Store clauses', at: 0.28 },
      { label: 'PREPARE', detail: 'Vector + graph', at: 0.4 },
      { label: 'RANK', detail: 'RAG rerank', at: 0.52 },
      { label: 'RETRIEVE', detail: 'Cite sources', at: 0.64 },
    ];
    const nodes = [
      { id: 'fund', x: 310, y: 168, r: 46, label: 'Fund\ncorpus', hub: true },
      { id: 'spa', x: 118, y: 78, r: 34, label: 'SPA' },
      { id: 'sha', x: 502, y: 72, r: 34, label: 'SHA' },
      { id: 'sl', x: 96, y: 250, r: 32, label: 'Side\nLetter' },
      { id: 'aoa', x: 520, y: 248, r: 32, label: 'AoA' },
      { id: 'pref', x: 310, y: 310, r: 36, label: 'Liq.\npref', hot: true },
    ];
    const edges = [
      ['fund', 'spa'], ['fund', 'sha'], ['fund', 'sl'], ['fund', 'aoa'], ['fund', 'pref'],
      ['spa', 'pref'], ['sha', 'pref'], ['aoa', 'pref'],
    ];
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const hit = (id) => {
      const order = { fund: 0, spa: 0.15, sha: 0.22, pref: 0.35, aoa: 0.45, sl: 0.55 };
      return clamp((search - (order[id] || 0)) / 0.25, 0, 1);
    };
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <div style={{
          width: 1380, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18,
          boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '28px 36px 32px',
          opacity: shell, transform: `translateY(${(1 - shell) * 36}px)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <img src="assets/perry-logo.png" alt="Perry" style={{ height: 22, filter: pal.dark ? 'invert(1)' : 'none' }} />
            <span style={{ fontFamily: M, fontSize: 18, letterSpacing: '0.16em', color: pal.ink, opacity: 0.5 }}>BACKEND</span>
            <span style={{ flex: 1 }} />
            <span style={{ ...mono, fontSize: 14, opacity: 0.5 }}>Knowledge graph · RAG retrieval</span>
          </div>

          <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
            <div style={{ flex: '1 1 640px', minWidth: 0 }}>
              <div style={{
                background: pillBg, borderRadius: 999, padding: '14px 24px', fontFamily: M, fontSize: 18, color: pal.ink,
                opacity: qIn, transform: `translateY(${(1 - qIn) * 12}px)`, marginBottom: 18,
              }}>
                What are the liquidation preferences across our portfolio?
              </div>
              <div style={{
                height: 360, borderRadius: 14, border: `1px solid ${cardBorder}`, background: pal.dark ? 'rgba(242,239,232,0.03)' : '#FAFBFA',
                position: 'relative', overflow: 'hidden', opacity: graphIn,
              }}>
                <svg width="100%" height="100%" viewBox="0 0 620 360" style={{ display: 'block' }}>
                  {edges.map(([a, b], i) => {
                    const A = byId[a], B = byId[b];
                    const on = Math.min(hit(a), hit(b));
                    return (
                      <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                        stroke={on > 0.4 ? pal.accent : pal.ink}
                        strokeWidth={on > 0.4 ? 2.4 : 1.4}
                        opacity={0.12 + 0.55 * on * graphIn}
                      />
                    );
                  })}
                  {nodes.map((n) => {
                    const h = hit(n.id);
                    const lit = n.hub || n.hot ? Math.max(h, 0.35 * graphIn) : h;
                    return (
                      <g key={n.id} opacity={0.35 + 0.65 * Math.max(graphIn * 0.5, lit)} transform={`translate(${n.x},${n.y}) scale(${0.92 + 0.08 * lit})`}>
                        <circle r={n.r} fill={n.hub || (n.hot && lit > 0.5) ? pal.accent : cardBg}
                          stroke={n.hub || (n.hot && lit > 0.5) ? pal.accent : pal.ink}
                          strokeWidth={n.hub ? 0 : 1.6}
                          opacity={n.hub ? 0.95 : 1}
                        />
                        {n.label.split('\n').map((line, li, arr) => (
                          <text key={li} y={(li - (arr.length - 1) / 2) * 14} textAnchor="middle" dominantBaseline="middle"
                            fill={n.hub || (n.hot && lit > 0.5) ? '#fff' : pal.ink}
                            style={{ fontFamily: M, fontSize: n.hub ? 13 : 12, letterSpacing: '0.04em' }}>
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                  {/* search pulse traveling from query toward pref */}
                  <circle cx={310 - 80 * (1 - search)} cy={40 + 120 * search} r={5 + 3 * search}
                    fill={pal.accent} opacity={search > 0.05 && search < 0.95 ? 0.85 : 0} />
                </svg>
                <div style={{ position: 'absolute', left: 16, bottom: 14, display: 'flex', gap: 8 }}>
                  {['45 companies', '12k clauses', 'live index'].map((t) => (
                    <span key={t} style={{ ...mono, fontSize: 12, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '5px 10px', opacity: 0.7 * graphIn }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ width: 380, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: T, fontWeight: 600, fontSize: 28, color: pal.ink, lineHeight: 1.2, marginBottom: 4, opacity: ez(p, 0.2, 0.06) }}>
                A searchable graph behind every answer
              </div>
              <div style={{ fontFamily: F, fontSize: 16, lineHeight: 1.45, color: pal.ink, opacity: 0.7 * ez(p, 0.24, 0.05), marginBottom: 8 }}>
                Documents become a knowledge graph. RAG retrieves the right clauses when you ask.
              </div>
              {steps.map((s, i) => {
                const e = ez(p, s.at, 0.07);
                const on = e > 0.55;
                return (
                  <div key={s.label} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12,
                    background: on ? (pal.dark ? 'rgba(0,156,127,0.12)' : 'rgba(0,156,127,0.07)') : pillBg,
                    border: `1px solid ${on ? pal.accent : cardBorder}`,
                    opacity: Math.max(0.3, e), transform: `translateX(${(1 - e) * 18}px)`,
                  }}>
                    <span style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                      background: on ? pal.accent : (pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.07)'),
                      color: on ? '#fff' : pal.ink,
                      fontFamily: M, fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>{i + 1}</span>
                    <div>
                      <div style={{ fontFamily: M, fontSize: 13, letterSpacing: '0.14em', color: on ? pal.accent : pal.ink, opacity: on ? 1 : 0.55 }}>{s.label}</div>
                      <div style={{ fontFamily: F, fontWeight: 600, fontSize: 16, color: pal.ink, marginTop: 2 }}>{s.detail}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{
                marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                borderRadius: 12, background: pillBg, opacity: ez(p, 0.68, 0.06),
              }}>
                <Check on={ez(p, 0.68, 0.06) > 0.55} accent={pal.accent} />
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 15, color: pal.ink }}>14 docs · 8 clauses retrieved</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 26, color: pal.ink, opacity: ez(p, 0.72, 0.06), textAlign: 'center' }}>
          Ask anything — <span style={{ color: pal.accent }}>about anything.</span>
        </div>
      </div>
    );
  }

  function SPatterns() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    // 0 hook · 1 knowledge graph / RAG · 2 insights UI · 3 payoff
    const TITLE = 0.11;
    const phase = p < 0.28 ? 0 : p < 0.54 ? 1 : p < 0.78 ? 2 : 3;
    const local = (a, b) => clamp((p - a) / (b - a), 0, 1);
    const lp = local(0.54, 0.78);
    const cardIn = ez(lp, 0.04, 0.1);
    const qIn = ez(lp, 0.14, 0.1);
    const ansIn = ez(lp, 0.28, 0.12);
    const cols = 22, rows = 3, total = cols * rows;
    const fillN = Math.floor(ez(p, 0.82, 0.12) * total);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 && p < TITLE
          ? <SectionTitle p={p} num="01" text="TRENDS & INSIGHT" until={TITLE} />
          : <Kicker p={p} at={phase === 0 ? TITLE : 0} num="01" text="TRENDS & INSIGHT" />}
        {phase === 0 && <HookLines p={p} size={72} l1="You have 45 portfolio companies." l2={'But do their legal documents really “tell” you anything?'} />}
        {phase === 1 && <PatternsBackend p={local(0.28, 0.54)} />}
        {phase === 2 && (
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
                    const e = ez(lp, 0.42 + i * 0.08, 0.12);
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
                <div style={{ display: 'flex', gap: 12, opacity: ez(lp, 0.62, 0.08) }}>
                  {['14 documents queried', '8 citations'].map((t) => (
                    <span key={t} style={{ ...mono, fontSize: 15, border: `1px solid ${cardBorder}`, borderRadius: 999, padding: '7px 16px', opacity: 0.75 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ width: 1160, opacity: ez(lp, 0.12, 0.08), transform: `translateY(${(1 - ez(lp, 0.12, 0.08)) * 10}px)` }}>
              <span style={{ fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 27, color: pal.ink }}>Your next term sheet, negotiated from data — <span style={{ color: pal.accent }}>not recollection.</span></span>
            </div>
          </div>
        )}
        {phase === 3 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div>
              <Slam p={p} at={0.8} size={96} color={pal.ink}>One document gives you answers.</Slam>
              <Slam p={p} at={0.82} size={96} color={pal.accent}>Two hundred give you a strategy.</Slam>
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
    { t: 'Collect signed IP assignment', c: 'Grape Ltd', o: 'Company counsel', d: '01 Aug', s0: 'Awaiting signature' },
    { t: 'File SH01 \u2014 share allotment', c: 'Grape Ltd', o: 'J. Whitfield', d: '08 Aug', s0: 'In progress' },
    { t: 'Board consent \u2014 ESOP top-up', c: 'Grape Ltd', o: 'Company counsel', d: '15 Aug', s0: 'Waiting on counterparty', focus: true },
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
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const mono = { fontFamily: M, fontSize: 17, color: pal.ink };
    const cardIn = ez(p, 0.02, 0.08);
    const agentIn = ez(p, 0.14, 0.07);
    const line1 = ez(p, 0.22, 0.06);
    const line2 = ez(p, 0.32, 0.06);
    const duePulse = ez(p, 0.28, 0.08);
    const notified = ez(p, 0.42, 0.07);
    const dueUrgent = duePulse > 0.45;
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1080, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, boxShadow: '0 24px 60px rgba(16,18,21,0.10)', padding: '36px 48px 40px', opacity: cardIn, transform: `translateY(${(1 - cardIn) * 40}px) scale(${0.96 + 0.04 * cardIn})`, position: 'relative' }}>
          <div style={{ ...mono, opacity: 0.55, marginBottom: 18 }}>← All tasks</div>
          <div style={{ fontFamily: T, fontWeight: 600, fontSize: 40, color: pal.ink }}>Board consent — ESOP top-up</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '18px 0 28px' }}>
            <span style={{ fontFamily: M, fontSize: 15, color: pal.ink, opacity: 0.75, background: pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.07)', borderRadius: 999, padding: '7px 15px' }}>Grape Ltd</span>
            <span style={{
              fontFamily: M, fontSize: 15, borderRadius: 999, padding: '7px 15px',
              color: dueUrgent ? '#fff' : pal.ink,
              opacity: dueUrgent ? 1 : 0.75,
              background: dueUrgent ? '#C43D3D' : (pal.dark ? 'rgba(242,239,232,0.1)' : 'rgba(16,18,21,0.07)'),
              transform: `scale(${0.94 + 0.06 * duePulse})`,
            }}>{dueUrgent ? 'Due in 3 days · 15 Aug' : 'Due 15 Aug'}</span>
            <span style={{ fontFamily: M, fontSize: 15, color: '#fff', background: '#b0873a', borderRadius: 999, padding: '7px 15px' }}>Waiting on counterparty</span>
          </div>
          <div style={{ ...mono, fontSize: 15, letterSpacing: '0.12em', opacity: 0.5, borderBottom: `1px solid ${cardBorder}`, paddingBottom: 10 }}>ACTIVITY</div>
          <div style={{ display: 'flex', gap: 16, padding: '22px 0 4px', opacity: agentIn, transform: `translateY(${(1 - agentIn) * 14}px)` }}>
            <span style={{
              width: 42, height: 42, borderRadius: 21, flexShrink: 0, background: pal.accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: M, fontSize: 18, fontWeight: 500, color: '#fff',
            }}>P</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: F, fontWeight: 600, fontSize: 18, color: pal.ink }}>Perry AI</span>
                <span style={{ fontFamily: M, fontSize: 12, letterSpacing: '0.1em', color: pal.accent, background: pal.dark ? 'rgba(0,156,127,0.16)' : 'rgba(0,156,127,0.1)', borderRadius: 999, padding: '3px 10px' }}>AGENT</span>
                <span style={{ ...mono, fontSize: 14, opacity: 0.45 }}>· just now</span>
              </div>
              <div style={{
                background: pillBg, border: `1px solid ${cardBorder}`, borderLeft: `3px solid ${pal.accent}`,
                borderRadius: 12, padding: '18px 20px',
              }}>
                <div style={{ fontFamily: F, fontSize: 20, lineHeight: 1.55, color: pal.ink, opacity: line1, transform: `translateY(${(1 - line1) * 8}px)` }}>
                  Reminder — this deadline is coming up fast.
                </div>
                <div style={{ fontFamily: F, fontSize: 20, lineHeight: 1.55, color: pal.ink, marginTop: 10, opacity: line2, transform: `translateY(${(1 - line2) * 8}px)` }}>
                  Board consent is due <strong style={{ color: '#C43D3D' }}>15 Aug (3 days)</strong>. Circulate for signature so you catch it — don’t wait on the counterparty.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, opacity: notified }}>
                <Check on={notified > 0.5} accent={pal.accent} />
                <span style={{ ...mono, opacity: 0.7 }}>J. Whitfield reminded by email · Slack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function STrack() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    // 0 hook · 1 chat upload+tasks · 2 task list click · 3 Perry deadline reminder · 4 payoff
    const TITLE = 0.11;
    const phase = p < 0.28 ? 0 : p < 0.505 ? 1 : p < 0.625 ? 2 : p < 0.835 ? 3 : 4;
    const local = (a, b) => clamp((p - a) / (b - a), 0, 1);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 && p < TITLE
          ? <SectionTitle p={p} num="04" text="POST-CLOSE TRACKING" until={TITLE} />
          : <Kicker p={p} at={phase === 0 ? TITLE : 0} num="04" text="POST-CLOSE TRACKING" />}
        {phase === 0 && <HookLines p={p} size={124} l1="The deal closed." l2="The work didn't." />}
        {phase === 1 && <TrackChat p={local(0.28, 0.505)} />}
        {phase === 2 && <TaskList p={local(0.505, 0.625)} />}
        {phase === 3 && <TaskDetail p={local(0.625, 0.835)} />}
        {phase === 4 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.85} size={98} color={pal.ink}>Every obligation — an owner,</Slam>
            <Slam p={p} at={0.865} size={98} color={pal.ink}>a deadline, a paper trail.</Slam>
            <Slam p={p} at={0.88} size={132} color={pal.accent}>Nothing slips.</Slam>
            <div style={{ marginTop: 44 }}>
              <KpiFlip p={p} at={0.9} label="Post-investment follow-up" from="Email chains" to="Shared tracking" />
            </div>
          </div>
        )}
      </div>
    );
  }

  function SClose() {
    const { progress: p } = useScene();
    const pal = React.useContext(Pal);
    const cardBg = pal.dark ? '#1f1d18' : '#ffffff';
    const cardBorder = pal.dark ? 'rgba(242,239,232,0.14)' : '#E4E7E5';
    const pillBg = pal.dark ? 'rgba(242,239,232,0.07)' : '#F2F7F5';
    const phase = p < 0.36 ? 0 : 1;
    const rows = [
      { cheap: 'Uncited chat answer', grade: 'Cited from your deal room' },
      { cheap: 'Generic clause guess', grade: 'Redlined to your playbook' },
      { cheap: 'No memory of your past deals', grade: 'Your historical negotiation positions' },
      { cheap: 'Hope someone follows up', grade: 'Owner · deadline · paper trail' },
      { cheap: 'Chat-only, one person', grade: 'Connected fund workflow' },
    ];
    const panelIn = ez(p, 0.38, 0.08);
    return (
      <div style={{ position: 'absolute', inset: 0, background: pal.paper }}>
        {phase === 0 && (
          <div style={{ position: 'absolute', inset: 0, padding: '0 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Slam p={p} at={0.04} size={72} color={pal.ink}>AI generated answers are cheap.</Slam>
            <Slam p={p} at={0.16} size={72} color={pal.accent}>Fund-level analysis is not.</Slam>
          </div>
        )}
        {phase === 1 && (
          <div style={{ position: 'absolute', inset: 0, padding: '88px 90px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
            <div style={{ opacity: ez(p, 0.36, 0.05) }}>
              <div style={{ fontFamily: T, fontWeight: 600, fontSize: 32, color: pal.ink, lineHeight: 1.2 }}>AI generated answers are cheap.</div>
              <div style={{ fontFamily: T, fontWeight: 600, fontSize: 32, color: pal.accent, lineHeight: 1.2, marginTop: 4 }}>Fund-level analysis is not.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, opacity: panelIn, transform: `translateY(${(1 - panelIn) * 24}px)` }}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 18, padding: '22px 26px 24px', boxShadow: '0 18px 44px rgba(16,18,21,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontFamily: M, fontSize: 13, letterSpacing: '0.14em', opacity: 0.45 }}>GENERIC AI</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontFamily: M, fontSize: 11, letterSpacing: '0.1em', color: '#fff', background: 'rgba(16,18,21,0.35)', borderRadius: 999, padding: '4px 10px' }}>CHEAP</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {rows.map((r, i) => {
                    const e = ez(p, 0.42 + i * 0.05, 0.06);
                    const st = ez(p, 0.48 + i * 0.05, 0.05);
                    return (
                      <div key={r.cheap} style={{
                        position: 'relative', padding: '11px 14px', borderRadius: 12, background: pillBg,
                        opacity: e, transform: `translateY(${(1 - e) * 10}px)`,
                      }}>
                        <div style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: pal.ink, opacity: 0.55 }}>{r.cheap}</div>
                        <span style={{ position: 'absolute', left: 12, right: 12, top: '52%', height: 2.5, background: '#C43D3D', width: `${st * 92}%`, borderRadius: 2 }} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{
                background: cardBg, border: `1.5px solid ${pal.accent}`, borderRadius: 18, padding: '22px 26px 24px',
                boxShadow: '0 18px 44px rgba(0,156,127,0.12)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src="assets/perry-logo.png" alt="Perry" style={{ height: 18, filter: pal.dark ? 'invert(1)' : 'none' }} />
                  <span style={{ fontFamily: M, fontSize: 13, letterSpacing: '0.14em', color: pal.ink, opacity: 0.5 }}>PERRY</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontFamily: M, fontSize: 11, letterSpacing: '0.1em', color: '#fff', background: pal.accent, borderRadius: 999, padding: '4px 10px' }}>FUND-LEVEL</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {rows.map((r, i) => {
                    const e = ez(p, 0.55 + i * 0.05, 0.06);
                    return (
                      <div key={r.grade} style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12,
                        background: pal.dark ? 'rgba(0,156,127,0.1)' : 'rgba(0,156,127,0.07)',
                        border: `1px solid ${pal.accent}`,
                        opacity: e, transform: `translateY(${(1 - e) * 10}px)`,
                      }}>
                        <Check on={e > 0.55} accent={pal.accent} />
                        <div style={{ fontFamily: F, fontWeight: 600, fontSize: 17, color: pal.ink }}>{r.grade}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{
              fontFamily: T, fontWeight: 600, fontStyle: 'italic', fontSize: 26, color: pal.ink, textAlign: 'center',
              opacity: ez(p, 0.76, 0.06), transform: `translateY(${(1 - ez(p, 0.76, 0.06)) * 12}px)`,
            }}>
              Perry doesn’t just answer — <span style={{ color: pal.accent }}>it runs the work.</span>
            </div>
          </div>
        )}
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
          <SceneStage width={1600} height={900} bg={pal.paper} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} soundtrack="./assets/a-little-higher.mp3?v=11" soundtrackDelay={0} soundtrackVolume={1} persistKey="perry-intro-v5">
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
