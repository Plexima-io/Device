/* Section 1 — "Zachytit" (Capture).
   Three people talk in turn (David, Aneta, Pavel) → Omi listens in the middle
   (calm emanating ripples) → the usage context cycles: office / online / field.
   Message: "Just have the conversation. Omi captures it, anywhere."
   Calm, seamless loop. Czech labels. */

const { Stage, useTime, Easing, clamp } = window;

const C = {
  bg:      '#F5F6F8',
  navy:    '#17173A',
  navy2:   '#26265A',
  navySoft:'#3A3A6B',
  amber:   '#F5B70A',
  sky:     '#4DABF7',
  ink:     '#2B2B47',
  gray:    '#8A90A2',
  line:    '#ECEEF3',
  cardBd:  '#ECEEF3',
};
const FONT = 'Inter, system-ui, sans-serif';
const smooth = (t, a, b) => Easing.easeInOutCubic(clamp((t - a) / (b - a), 0, 1));

const D = 7;
const DEV = { x: 500, y: 336 };

// three speakers, taking turns round-robin (David → Aneta → Pavel)
const SPK = [
  { name: 'David', tone: C.navySoft, cx: 176, cy: 250, right: true,  ln: [262,262, 414,318] },
  { name: 'Aneta', tone: C.sky,      cx: 176, cy: 422, right: true,  ln: [262,414, 414,356] },
  { name: 'Pavel', tone: C.amber,    cx: 824, cy: 336, right: false, ln: [738,336, 596,336] },
];

const CTX = [
  { label: 'Kancelář', icon: 'office' },
  { label: 'Online hovor', icon: 'online' },
  { label: 'V terénu', icon: 'field' },
];

function ctxIcon(kind, color) {
  const s = { position: 'absolute', left: 0, top: 0 };
  if (kind === 'office') {
    return React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18', style:s },
      React.createElement('rect', { x:2.5, y:3, width:8, height:12, rx:1, stroke:color, strokeWidth:1.4, fill:'none' }),
      React.createElement('path', { d:'M10.5 7h4.5v8', stroke:color, strokeWidth:1.4, fill:'none', strokeLinejoin:'round' }),
      React.createElement('path', { d:'M4.6 6h2 M4.6 9h2 M4.6 12h2 M12 10h1.5 M12 12.5h1.5', stroke:color, strokeWidth:1.2, strokeLinecap:'round' }),
    );
  }
  if (kind === 'online') {
    return React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18', style:s },
      React.createElement('rect', { x:2, y:3.5, width:10, height:8, rx:1.4, stroke:color, strokeWidth:1.4, fill:'none' }),
      React.createElement('path', { d:'M12 6.4 L16 4.4 v7.2 L12 9.6 Z', stroke:color, strokeWidth:1.4, fill:'none', strokeLinejoin:'round' }),
      React.createElement('path', { d:'M5 14.5h4', stroke:color, strokeWidth:1.4, strokeLinecap:'round' }),
    );
  }
  return React.createElement('svg', { width:18, height:18, viewBox:'0 0 18 18', style:s },
    React.createElement('path', { d:'M9 2.2c2.9 0 5 2.1 5 4.9 0 3.4-5 8.4-5 8.4S4 10.5 4 7.1C4 4.3 6.1 2.2 9 2.2Z', stroke:color, strokeWidth:1.4, fill:'none', strokeLinejoin:'round' }),
    React.createElement('circle', { cx:9, cy:7, r:1.8, stroke:color, strokeWidth:1.4, fill:'none' }),
  );
}

function SceneContent() {
  const t = useTime();
  const puls = Math.sin((t / D) * Math.PI * 2 * 2);
  const seg = D / 3;

  // round-robin speaking envelope: sin bump within each speaker's 1/3 segment
  const spkEnv = k => {
    const local = (t - k * seg) / seg; // 0..1 within own segment
    return (local >= 0 && local <= 1) ? Math.sin(Math.PI * local) : 0;
  };

  const els = [];

  // ═══ connectors (SVG), lit for the active speaker ═══
  els.push(React.createElement('svg', {
    key:'svg', width:1000, height:800,
    style:{ position:'absolute', left:0, top:0, overflow:'visible' },
  },
    ...SPK.map((s, k) => {
      const env = spkEnv(k);
      return React.createElement('line', { key:k, x1:s.ln[0], y1:s.ln[1], x2:s.ln[2], y2:s.ln[3], stroke: env > 0.15 ? C.sky : '#CDD5E1', strokeWidth:2, strokeDasharray:'2 7', strokeLinecap:'round', opacity:0.35 + env*0.5 });
    }),
  ));

  // ═══ emanating listening ripples ═══
  for (let k = 0; k < 3; k++) {
    const phase = ((t / D) + k / 3) % 1;
    const r = 74 + phase * 150;
    const op = clamp(phase / 0.12, 0, 1) * (1 - phase) * 0.32;
    els.push(React.createElement('div', { key:'rip'+k, style:{ position:'absolute', left:DEV.x - r, top:DEV.y - r, width:r*2, height:r*2, borderRadius:'50%', border:'1.5px solid '+C.sky, opacity:op } }));
  }

  // ═══ device (Omi, listening) ═══
  const px = DEV.x, py = DEV.y;
  const ringR = 82 + puls*6;
  els.push(React.createElement('div', { key:'ring', style:{ position:'absolute', left:px-ringR, top:py-ringR, width:ringR*2, height:ringR*2, borderRadius:'50%', border:'2px solid '+C.sky, opacity:0.16+(puls*0.5+0.5)*0.2 } }));
  els.push(React.createElement('div', { key:'lens', style:{ position:'absolute', left:px-70, top:py-70, width:140, height:140, borderRadius:'50%', background:'#fff', boxShadow:'0 14px 40px rgba(23,23,58,0.16), inset 0 0 0 1px #EEF1F6' } }));
  els.push(React.createElement('div', { key:'core', style:{ position:'absolute', left:px-52, top:py-52, width:104, height:104, borderRadius:'50%', background:'radial-gradient(circle at 42% 38%, '+C.navy2+' 0%, '+C.navy+' 62%, #101031 100%)', boxShadow:'inset 0 3px 10px rgba(0,0,0,0.35)' } }));
  const dotS = 12 + (puls*0.5+0.5)*4;
  els.push(React.createElement('div', { key:'dot', style:{ position:'absolute', left:px-dotS/2, top:py-dotS/2, width:dotS, height:dotS, borderRadius:'50%', background:C.sky, boxShadow:'0 0 14px rgba(77,171,247,0.75)' } }));
  els.push(React.createElement('div', { key:'rec', style:{ position:'absolute', left:px-60, top:py+92, width:120, display:'flex', alignItems:'center', justifyContent:'center', gap:7, fontFamily:FONT, fontSize:12, fontWeight:600, letterSpacing:'0.14em', color:C.gray } },
    React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:'#E5484D', opacity:0.55+(puls*0.5+0.5)*0.45 } }),
    React.createElement('span', null, 'NAHRÁVÁM'),
  ));

  // ═══ three speakers (named, taking turns) ═══
  SPK.forEach((s, k) => {
    const env = spkEnv(k);
    const left = s.cx - 88, top = s.cy - 30;
    els.push(React.createElement('div', { key:'sp'+k, style:{ position:'absolute', left, top, width:176, height:60, borderRadius:16, background:'#fff', border:'1px solid '+C.cardBd, boxShadow:'0 12px 30px rgba(23,23,58,'+(0.05+env*0.09)+')', display:'flex', alignItems:'center', gap:11, padding:'0 14px', boxSizing:'border-box', transform:'scale('+(0.97+env*0.03)+')', opacity:0.62+env*0.38 } },
      // avatar
      React.createElement('div', { style:{ width:30, height:30, borderRadius:'50%', flex:'0 0 auto', background:s.tone, color:'#fff', fontFamily:FONT, fontSize:13, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' } }, s.name[0]),
      // name + waveform
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:5, minWidth:0 } },
        React.createElement('span', { style:{ fontFamily:FONT, fontSize:13.5, fontWeight:600, color:C.navy } }, s.name),
        React.createElement('div', { style:{ display:'flex', alignItems:'flex-end', gap:3, height:14 } },
          ...[0,1,2,3,4,5,6].map(i => {
            const a = (Math.sin((t/D)*Math.PI*2*6 + i*0.8 + k)*0.5+0.5);
            const h = 3 + env*a*13;
            return React.createElement('div', { key:i, style:{ width:4, height:h, borderRadius:2, background: env > 0.1 ? C.sky : '#D6DBE6', opacity:0.5+env*0.5 } });
          }),
        ),
      ),
    ));
    // tail
    els.push(React.createElement('div', { key:'sp'+k+'t', style:{ position:'absolute', left: s.right ? s.cx+76 : s.cx-90, top:s.cy+18, width:14, height:14, background:'#fff', borderRight: s.right ? '1px solid '+C.cardBd : 'none', borderTop: s.right ? '1px solid '+C.cardBd : 'none', borderLeft: s.right ? 'none' : '1px solid '+C.cardBd, borderBottom: s.right ? 'none' : '1px solid '+C.cardBd, transform:'rotate(45deg)', opacity:0.62+env*0.38 } }));
  });

  // ═══ context cycle chip ═══
  CTX.forEach((c, i) => {
    const start = i * seg, end = (i + 1) * seg;
    const fadeIn = smooth(t, start - 0.25, start + 0.25);
    const fadeOut = 1 - smooth(t, end - 0.25, end + 0.25);
    let op = Math.min(fadeIn, fadeOut);
    if (i === 0) op = Math.max(op, 1 - smooth(t, D - 0.25, D + 0.25));
    const rise = (1 - op) * 6;
    els.push(React.createElement('div', { key:'ctx'+i, style:{ position:'absolute', left:DEV.x-95, top:520, width:190, display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'11px 18px', borderRadius:14, background:'#fff', border:'1px solid '+C.cardBd, boxShadow:'0 10px 26px rgba(23,23,58,0.07)', opacity:op, transform:'translateY('+rise+'px)', boxSizing:'border-box' } },
      React.createElement('div', { style:{ position:'relative', width:18, height:18 } }, ctxIcon(c.icon, C.navySoft)),
      React.createElement('span', { style:{ fontFamily:FONT, fontSize:14.5, fontWeight:600, color:C.navy } }, c.label),
    ));
  });
  els.push(React.createElement('div', { key:'dots', style:{ position:'absolute', left:DEV.x-24, top:576, width:48, display:'flex', justifyContent:'center', gap:8 } },
    ...CTX.map((c, i) => {
      const start = i * seg, end = (i + 1) * seg;
      let on = Math.min(smooth(t, start - 0.25, start + 0.25), 1 - smooth(t, end - 0.25, end + 0.25));
      if (i === 0) on = Math.max(on, 1 - smooth(t, D - 0.25, D + 0.25));
      return React.createElement('div', { key:i, style:{ width:6, height:6, borderRadius:'50%', background: on > 0.4 ? C.sky : '#D6DBE6' } });
    }),
  ));

  return React.createElement('div', { style:{ position:'absolute', inset:0, width:1000, height:800 } }, els);
}

function CaptureScene() {
  return React.createElement(Stage, {
    width: 1000, height: 800, duration: D, background: C.bg, loop: true, autoplay: true,
    persistKey: 'capture-scene',
  }, React.createElement(SceneContent, null));
}

window.CaptureScene = CaptureScene;
