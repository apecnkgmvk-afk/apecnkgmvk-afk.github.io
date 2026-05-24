/* ═══════════════════════════════════════════
   APEC — script.js
   ═══════════════════════════════════════════ */

// ────────────────────────────────────────────
// 1. PARTICLE HERO
// ────────────────────────────────────────────
const pCanvas = document.getElementById('particle-canvas');
const pCtx = pCanvas.getContext('2d');
let PW, PH, particles = [];

function resizeCanvas() {
  PW = pCanvas.width  = pCanvas.offsetWidth;
  PH = pCanvas.height = pCanvas.offsetHeight;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  buildParticles();
});

resizeCanvas();

class Particle {
  constructor() { this.reset(true); }
  reset(rand = false) {
    this.x  = rand ? Math.random() * PW : Math.random() * PW;
    this.y  = rand ? Math.random() * PH : Math.random() * PH;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r  = Math.random() * 1.4 + 0.3;
    this.a  = Math.random() * 0.55 + 0.1;
    this.gold = Math.random() > 0.72;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -10 || this.x > PW + 10 || this.y < -10 || this.y > PH + 10) this.reset();
  }
  draw() {
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    pCtx.fillStyle = this.gold ? '#F5C518' : '#00D8FF';
    pCtx.globalAlpha = this.a;
    pCtx.fill();
  }
}

function buildParticles() {
  const count = Math.floor((PW * PH) / 10000);
  particles = Array.from({ length: Math.min(count, 140) }, () => new Particle());
}

buildParticles();

function drawConnections() {
  const MAX = 110;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX) {
        pCtx.beginPath();
        pCtx.moveTo(particles[i].x, particles[i].y);
        pCtx.lineTo(particles[j].x, particles[j].y);
        pCtx.globalAlpha = (1 - d / MAX) * 0.12;
        pCtx.strokeStyle = '#00D8FF';
        pCtx.lineWidth = 0.6;
        pCtx.stroke();
      }
    }
  }
}

(function tick() {
  pCtx.clearRect(0, 0, PW, PH);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  pCtx.globalAlpha = 1;
  requestAnimationFrame(tick);
})();

// ────────────────────────────────────────────
// 2. FANZINE PAGES DATA
// ────────────────────────────────────────────
const pages = [
  {
    label: 'Pág. 1 — Capa',
    html: `<div class="fp fp-1">
      <div class="fp-1-title">APEC</div>
      <div class="fp-1-bar"></div>
      <div class="fp-1-sub">Asia-Pacific Economic Cooperation</div>
      <div class="fp-1-list">
        Austrália · Brunei · Canadá · Chile · China<br>
        Hong Kong · Indonésia · Japão · Malásia<br>
        México · Nova Zelândia · Papua N.G. · Peru<br>
        Filipinas · Rússia · Singapura · Coreia do Sul<br>
        Taiwan · Tailândia · EUA · Vietnã
      </div>
      <div class="fp-1-badge">PÁG. 1 — CAPA</div>
    </div>`
  },
  {
    label: 'Pág. 2 — A Origem',
    html: `<div class="fp fp-2">
      <div class="fp-hd">
        <h3>A ORIGEM</h3>
        <p>1989 — O mundo muda, o Pacífico responde</p>
      </div>
      <div class="fp-bd">
        <div class="mini-tl">
          ${[
            ['1989','Fundada em Canberra, Austrália, com 12 economias.'],
            ['1991','China, Taiwan e Hong Kong entram juntos.'],
            ['1993','1ª Cúpula de Líderes: a APEC ganha peso político.'],
            ['1994','Metas de Bogor: zerar barreiras até 2020.'],
            ['2001','Peru e Vietnã ingressam no bloco.'],
            ['2023','PIB combinado ultrapassa US$ 52 trilhões.'],
          ].map(([y,t]) => `
            <div class="mt-row">
              <div class="mt-yr">${y}</div>
              <div class="mt-dot-wrap">
                <div class="mt-dot"></div>
                <div class="mt-line"></div>
              </div>
              <div class="mt-txt">${t}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>`
  },
  {
    label: 'Pág. 3 — Como Funciona',
    html: `<div class="fp fp-3">
      <div class="fp-hd">
        <h3>COMO FUNCIONA</h3>
        <p>21 economias · 1 princípio: consenso voluntário</p>
      </div>
      <div class="fp-bd">
        <div class="org">
          <div class="org-node on-1"><h4>⭐ CÚPULA DE LÍDERES</h4><p>Chefes de Estado definem a agenda anual</p></div>
          <div class="org-arr">↓</div>
          <div class="org-node on-2"><h4>📋 REUNIÕES DE MINISTROS</h4><p>Economia · Comércio · Energia · Saúde</p></div>
          <div class="org-arr">↓</div>
          <div class="org-node on-3"><h4>🔬 GRUPOS DE TRABALHO</h4><p>Especialistas implementam as decisões</p></div>
          <div class="org-arr">↓</div>
          <div class="org-node on-4"><h4>🏢 SECRETARIADO — SINGAPURA (1993)</h4><p>Suporte administrativo permanente do bloco</p></div>
        </div>
        <div style="margin-top:10px;padding:7px 10px;background:rgba(245,197,24,0.07);border-radius:6px;border-left:2px solid #F5C518;">
          <p style="font-size:7.5px;color:#F5C518;font-family:'Space Mono',monospace;font-style:italic;">"Nenhum membro é obrigado a cumprir nada — e mesmo assim funciona."</p>
        </div>
      </div>
    </div>`
  },
  {
    label: 'Pág. 4 — Os Números',
    html: `<div class="fp fp-4">
      <div class="fp-hd">
        <h3>OS NÚMEROS</h3>
        <p>O peso econômico que faz o mundo prestar atenção</p>
      </div>
      <div class="fp-bd">
        <div class="sm-grid">
          <div class="sm-card"><div class="sm-ico">🌍</div><div class="sm-num">2,9 bi</div><div class="sm-lbl">de pessoas<br>38% da pop. mundial</div></div>
          <div class="sm-card"><div class="sm-ico">💰</div><div class="sm-num">US$52tri</div><div class="sm-lbl">PIB combinado<br>maior bloco do mundo</div></div>
          <div class="sm-card"><div class="sm-ico">📦</div><div class="sm-num">47%</div><div class="sm-lbl">do comércio<br>global em 2023</div></div>
          <div class="sm-card"><div class="sm-ico">📈</div><div class="sm-num">3×</div><div class="sm-lbl">crescimento vs<br>resto do mundo</div></div>
        </div>
        <div style="margin-top:9px;padding:8px;background:rgba(0,216,255,0.05);border-radius:7px;text-align:center;">
          <p style="font-family:'Space Mono',monospace;font-size:7px;color:#6878A0;">A APEC não é o futuro da economia global.</p>
          <p style="font-family:'Space Mono',monospace;font-size:7.5px;color:#00D8FF;margin-top:2px;">É o presente.</p>
        </div>
      </div>
    </div>`
  },
  {
    label: 'Pág. 5 — Metas de Bogor',
    html: `<div class="fp fp-5">
      <div class="fp-hd">
        <h3>METAS DE BOGOR</h3>
        <p>A promessa feita em uma ilha da Indonésia — 1994</p>
      </div>
      <div class="fp-bd">
        <div class="bogor-row">
          <div class="bcol bcol-m">
            <h4>🎯 A META</h4>
            <div class="bitem"><b>Até 2010:</b> livre comércio para economias desenvolvidas</div>
            <div class="bitem"><b>Até 2020:</b> livre comércio para economias em desenvolvimento</div>
            <div class="bitem"><b>Como:</b> consenso voluntário</div>
          </div>
          <div class="bcol bcol-r">
            <h4>✅ RESULTADO</h4>
            <div class="bitem">Tarifas: <b>17% → 5%</b></div>
            <div class="bitem">Comércio regional: <b>triplicou</b></div>
            <div class="bitem">Acordos bilaterais: <b>+60</b></div>
          </div>
        </div>
        <div class="bogor-quote">
          <p>"Metas ousadas, mesmo imperfeitas, movem o mundo."</p>
        </div>
      </div>
    </div>`
  },
  {
    label: 'Pág. 6 — Tensões',
    html: `<div class="fp fp-6">
      <div class="fp-hd">
        <h3>TENSÕES &amp; DESAFIOS</h3>
        <p>O elefante na sala chama-se geopolítica</p>
      </div>
      <div class="fp-bd">
        <div class="tens-grid">
          <div class="tcard"><div class="t-ico">🇺🇸🇨🇳</div><div class="t-ttl">GUERRA COMERCIAL</div><div class="t-txt">Tarifas bilionárias entre EUA e China ameaçam a coesão do bloco</div></div>
          <div class="tcard"><div class="t-ico">🌡️</div><div class="t-ttl">CLIMA</div><div class="t-txt">Mudanças climáticas exigem cooperação além do livre comércio</div></div>
          <div class="tcard"><div class="t-ico">🤖</div><div class="t-ttl">IA &amp; DIGITAL</div><div class="t-txt">Nova desigualdade entre membros avançados e emergentes</div></div>
          <div class="tcard"><div class="t-ico">🦠</div><div class="t-ttl">PÓS-PANDEMIA</div><div class="t-txt">Covid-19 expôs a fragilidade das cadeias de suprimento</div></div>
        </div>
        <div style="margin-top:10px;padding:8px 10px;background:rgba(255,53,83,0.07);border-radius:6px;text-align:center;">
          <p style="font-family:'Space Mono',monospace;font-size:7.5px;color:#FF3553;font-style:italic;">"Todos ganham mais dentro do que fora."</p>
        </div>
      </div>
    </div>`
  },
  {
    label: 'Pág. 7 — APEC Hoje',
    html: `<div class="fp fp-7">
      <div class="fp-hd">
        <h3>A APEC HOJE</h3>
        <p>Do fax ao algoritmo — o bloco se reinventa</p>
      </div>
      <div class="fp-bd">
        <div class="hoje-cards">
          <div class="hcard"><div class="h-ico">🏛️</div><div><div class="h-ttl">CÚPULA DE LIMA 2024</div><div class="h-txt">Peru como anfitrião: foco em desenvolvimento inclusivo e transição energética</div></div></div>
          <div class="hcard"><div class="h-ico">💻</div><div><div class="h-ttl">ECONOMIA DIGITAL</div><div class="h-txt">Framework para comércio de dados entre as 21 economias membros</div></div></div>
          <div class="hcard"><div class="h-ico">🌱</div><div><div class="h-ttl">SUSTENTABILIDADE</div><div class="h-txt">Metas de emissão zero alinhadas ao Acordo de Paris</div></div></div>
          <div class="hcard"><div class="h-ico">♀️</div><div><div class="h-ttl">INCLUSÃO FEMININA</div><div class="h-txt">Meta: -50% na desigualdade econômica de gênero até 2030</div></div></div>
        </div>
      </div>
    </div>`
  },
  {
    label: 'Pág. 8 — Contracapa',
    html: `<div class="fp fp-8">
      <div class="fp-8-big">APEC</div>
      <div class="fp-8-dots">
        <span></span><span></span><span></span>
      </div>
      <div class="fp-8-tagline">
        21 economias. 2,9 bilhões de pessoas.<br>
        Uma mesa. Nenhum voto obrigatório.<br>
        O maior experimento de cooperação<br>
        voluntária da história moderna.
      </div>
      <div class="fp-8-credits">
        <p class="cr-title">FANZINE ESCOLAR — BLOCO ECONÔMICO: APEC</p>
        <p>Turma: _________ &nbsp;|&nbsp; Ano: _________ &nbsp;|&nbsp; Escola: _________________________</p>
      </div>
    </div>`
  }
];

// ────────────────────────────────────────────
// 3. CAROUSEL
// ────────────────────────────────────────────
let cur = 0;
const track     = document.getElementById('carouselTrack');
const dotsWrap  = document.getElementById('carouselDots');
const labelEl   = document.getElementById('carouselLabel');
const POSITIONS = ['pos-p2','pos-p1','pos-active','pos-n1','pos-n2'];

function buildCarousel() {
  track.innerHTML = '';
  dotsWrap.innerHTML = '';

  pages.forEach((pg, i) => {
    const card = document.createElement('div');
    card.className = 'fanzine-card';
    card.innerHTML  = pg.html;
    card.addEventListener('click', () => { if (i !== cur) goTo(i); });
    track.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'c-dot';
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  renderCarousel();
}

function getPos(i) {
  const n = pages.length;
  let d = ((i - cur) % n + n) % n;
  if (d > n / 2) d -= n;
  if (d === 0)  return 'pos-active';
  if (d === -1) return 'pos-p1';
  if (d === -2) return 'pos-p2';
  if (d === 1)  return 'pos-n1';
  if (d === 2)  return 'pos-n2';
  return 'pos-hide';
}

function renderCarousel() {
  const cards = track.querySelectorAll('.fanzine-card');
  const dots  = dotsWrap.querySelectorAll('.c-dot');

  cards.forEach((c, i) => {
    c.className = 'fanzine-card ' + getPos(i);
  });

  dots.forEach((d, i) => {
    d.className = 'c-dot' + (i === cur ? ' active' : '');
  });

  labelEl.textContent = pages[cur].label;
}

function goTo(n) {
  cur = ((n % pages.length) + pages.length) % pages.length;
  renderCarousel();
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(cur - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(cur + 1));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  goTo(cur - 1);
  if (e.key === 'ArrowRight') goTo(cur + 1);
});

buildCarousel();

// ────────────────────────────────────────────
// 4. WORLD MAP (D3 + TopoJSON)
// ────────────────────────────────────────────
const APEC = {
  36:  { name:'Austrália',      flag:'🇦🇺', gdp:'US$ 1,7 tri', pop:'26 mi',   trade:'US$ 580 bi'  },
  96:  { name:'Brunei',         flag:'🇧🇳', gdp:'US$ 14 bi',   pop:'460 mil', trade:'US$ 11 bi'   },
  124: { name:'Canadá',         flag:'🇨🇦', gdp:'US$ 2,1 tri', pop:'38 mi',   trade:'US$ 1,1 tri' },
  152: { name:'Chile',          flag:'🇨🇱', gdp:'US$ 317 bi',  pop:'19 mi',   trade:'US$ 160 bi'  },
  156: { name:'China',          flag:'🇨🇳', gdp:'US$ 17,7 tri',pop:'1,4 bi',  trade:'US$ 6,3 tri' },
  344: { name:'Hong Kong',      flag:'🇭🇰', gdp:'US$ 360 bi',  pop:'7,5 mi',  trade:'US$ 1,1 tri' },
  360: { name:'Indonésia',      flag:'🇮🇩', gdp:'US$ 1,3 tri', pop:'275 mi',  trade:'US$ 470 bi'  },
  392: { name:'Japão',          flag:'🇯🇵', gdp:'US$ 4,2 tri', pop:'125 mi',  trade:'US$ 1,5 tri' },
  458: { name:'Malásia',        flag:'🇲🇾', gdp:'US$ 407 bi',  pop:'33 mi',   trade:'US$ 520 bi'  },
  484: { name:'México',         flag:'🇲🇽', gdp:'US$ 1,3 tri', pop:'130 mi',  trade:'US$ 1,0 tri' },
  554: { name:'Nova Zelândia',  flag:'🇳🇿', gdp:'US$ 252 bi',  pop:'5 mi',    trade:'US$ 100 bi'  },
  598: { name:'Papua N. Guiné', flag:'🇵🇬', gdp:'US$ 30 bi',   pop:'10 mi',   trade:'US$ 20 bi'   },
  604: { name:'Peru',           flag:'🇵🇪', gdp:'US$ 242 bi',  pop:'33 mi',   trade:'US$ 110 bi'  },
  608: { name:'Filipinas',      flag:'🇵🇭', gdp:'US$ 404 bi',  pop:'115 mi',  trade:'US$ 220 bi'  },
  643: { name:'Rússia',         flag:'🇷🇺', gdp:'US$ 2,2 tri', pop:'144 mi',  trade:'US$ 780 bi'  },
  702: { name:'Singapura',      flag:'🇸🇬', gdp:'US$ 467 bi',  pop:'5,9 mi',  trade:'US$ 1,0 tri' },
  410: { name:'Coreia do Sul',  flag:'🇰🇷', gdp:'US$ 1,7 tri', pop:'51 mi',   trade:'US$ 1,3 tri' },
  158: { name:'Taiwan',         flag:'🇹🇼', gdp:'US$ 760 bi',  pop:'23 mi',   trade:'US$ 750 bi'  },
  764: { name:'Tailândia',      flag:'🇹🇭', gdp:'US$ 512 bi',  pop:'71 mi',   trade:'US$ 500 bi'  },
  840: { name:'EUA',            flag:'🇺🇸', gdp:'US$ 26,9 tri',pop:'335 mi',  trade:'US$ 5,4 tri' },
  704: { name:'Vietnã',         flag:'🇻🇳', gdp:'US$ 430 bi',  pop:'98 mi',   trade:'US$ 730 bi'  },
};

async function buildMap() {
  const container = document.getElementById('map-container');
  const svgEl     = document.getElementById('world-svg');
  const tip       = document.getElementById('country-tooltip');
  const MW = 960, MH = 500;

  svgEl.setAttribute('viewBox', `0 0 ${MW} ${MH}`);

  const proj = d3.geoNaturalEarth1().scale(155).translate([MW / 2, MH / 2]);
  const path = d3.geoPath().projection(proj);
  const svg  = d3.select('#world-svg');

  // Background
  svg.append('rect').attr('width', MW).attr('height', MH).attr('fill', '#060F1E');

  // Graticule
  svg.append('path')
    .datum(d3.geoGraticule()())
    .attr('class', 'graticule-path')
    .attr('d', path);

  try {
    const world    = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const features = topojson.feature(world, world.objects.countries).features;

    svg.selectAll('path.country')
      .data(features)
      .enter().append('path')
      .attr('class', d => APEC[+d.id] ? 'c-apec' : 'c-land')
      .attr('d', path)
      .on('mousemove', function(event, d) {
        const info = APEC[+d.id];
        if (!info) return;

        const rect = container.getBoundingClientRect();
        let tx = event.clientX - rect.left + 18;
        let ty = event.clientY - rect.top - 10;

        tip.innerHTML = `
          <div class="tt-flag">${info.flag}</div>
          <div class="tt-name">${info.name}</div>
          <div class="tt-row">
            <div class="tt-stat"><div class="tt-val">${info.gdp}</div><div class="tt-key">PIB</div></div>
            <div class="tt-stat"><div class="tt-val">${info.pop}</div><div class="tt-key">Pop.</div></div>
            <div class="tt-stat"><div class="tt-val">${info.trade}</div><div class="tt-key">Comércio</div></div>
          </div>`;

        if (tx + 210 > container.offsetWidth) tx = event.clientX - rect.left - 218;
        if (ty < 0) ty = 8;

        tip.style.left = tx + 'px';
        tip.style.top  = ty + 'px';
        tip.classList.remove('hidden');
      })
      .on('mouseleave', function(_, d) {
        if (APEC[+d.id]) tip.classList.add('hidden');
      });

  } catch (err) {
    svg.append('text')
      .attr('x', MW / 2).attr('y', MH / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6878A0')
      .attr('font-family', 'Space Mono')
      .attr('font-size', 14)
      .text('Conecte-se à internet para carregar o mapa interativo.');
  }

  // Members pill list
  const list = document.getElementById('members-list');
  Object.entries(APEC).forEach(([, d]) => {
    const pill = document.createElement('div');
    pill.className = 'm-pill';
    pill.innerHTML = `<span>${d.flag}</span><span>${d.name}</span>`;
    list.appendChild(pill);
  });
}

buildMap();

// ────────────────────────────────────────────
// 5. ANIMATED STATS
// ────────────────────────────────────────────
const STATS = [
  { ico:'💰', n:52,   pre:'US$ ', suf:' tri',  lbl:'PIB Combinado',     desc:'maior concentração do planeta'  },
  { ico:'🌍', n:2.9,  pre:'',     suf:' bi',   lbl:'Pessoas',           desc:'38% da população mundial'       },
  { ico:'📦', n:47,   pre:'',     suf:'%',     lbl:'Comércio Global',   desc:'de tudo trocado no mundo'       },
  { ico:'🤝', n:21,   pre:'',     suf:'',      lbl:'Economias-Membro',  desc:'sem tratado vinculante'         },
  { ico:'📈', n:3,    pre:'',     suf:'×',     lbl:'Crescimento',       desc:'vs. resto do mundo desde 1989'  },
  { ico:'📅', n:35,   pre:'+',    suf:' anos', lbl:'De Cooperação',     desc:'desde Canberra, 1989'           },
];

function buildStats() {
  const grid = document.getElementById('statsGrid');
  STATS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'stat-card reveal';
    card.dataset.n = s.n;
    card.innerHTML = `
      <div class="stat-ico">${s.ico}</div>
      <div class="stat-num">
        <span class="pre">${s.pre}</span><span class="cnt">0</span><span class="suf">${s.suf}</span>
      </div>
      <div class="stat-lbl">${s.lbl}</div>
      <div class="stat-desc">${s.desc}</div>`;
    grid.appendChild(card);
  });
}

function animateCount(card) {
  const cnt    = card.querySelector('.cnt');
  const target = parseFloat(card.dataset.n);
  const float  = target % 1 !== 0;
  const dur    = 1800;
  const start  = performance.now();

  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease out cubic
    cnt.textContent = float ? (target * e).toFixed(1) : Math.floor(target * e);
    if (p < 1) requestAnimationFrame(step);
    else cnt.textContent = float ? target.toFixed(1) : target;
  }
  requestAnimationFrame(step);
}

buildStats();

// ────────────────────────────────────────────
// 6. TIMELINE
// ────────────────────────────────────────────
const TL_EVENTS = [
  { yr:'1989', ev:'Fundação em Canberra',     desc:'12 economias se reúnem na Austrália e criam o maior fórum de cooperação econômica do Pacífico.',    tag:'ORIGEM',    col:'#F5C518' },
  { yr:'1991', ev:'China, HK e Taiwan',       desc:'As três economias chinesas entram simultaneamente — um feito diplomático sem precedentes históricos.',tag:'EXPANSÃO',  col:'#00D8FF' },
  { yr:'1993', ev:'1ª Cúpula de Líderes',     desc:'Clinton convida líderes para Blake Island. A APEC ganha força e visibilidade política global.',       tag:'MARCO',     col:'#A855F7' },
  { yr:'1994', ev:'Metas de Bogor',           desc:'Compromisso histórico: livre comércio para economias desenvolvidas até 2010 e emergentes até 2020.',  tag:'META',      col:'#F5C518' },
  { yr:'1998', ev:'Crise Asiática',           desc:'O bloco coordena respostas à maior turbulência financeira da região, reforçando sua importância.',     tag:'CRISE',     col:'#FF3553' },
  { yr:'2001', ev:'Peru e Vietnã entram',     desc:'América do Sul e Sudeste Asiático fortalecem sua presença no fórum com novos membros estratégicos.',   tag:'EXPANSÃO',  col:'#00D8FF' },
  { yr:'2010', ev:'Prazo Bogor (avançados)',  desc:'Economias desenvolvidas atingem a meta: tarifas caem de 17% para menos de 5% em toda a região.',      tag:'CONQUISTA', col:'#00E676' },
  { yr:'2015', ev:'Agenda de Manila',         desc:'Inclusão, crescimento sustentável e segurança alimentar tornam-se pautas permanentes do bloco.',       tag:'AGENDA',    col:'#00D8FF' },
  { yr:'2020', ev:'Pandemia de Covid-19',     desc:'Reuniões virtuais de emergência coordenam respostas de saúde e econômicas em toda a região do Pacífico.',tag:'CRISE',   col:'#FF3553' },
  { yr:'2022', ev:'Cúpula de Bangkok',        desc:'Tailândia preside: bioeconomia circular, sustentabilidade e comércio digital dominam a pauta.',       tag:'ATUAL',     col:'#00D8FF' },
  { yr:'2024', ev:'Cúpula de Lima',           desc:'Peru como anfitrião. Foco em desenvolvimento inclusivo, transição energética limpa e apoio às PMEs.',  tag:'ATUAL',     col:'#00D8FF' },
  { yr:'2025', ev:'Coreia do Sul preside',    desc:'Inteligência artificial, inovação tecnológica e conectividade sustentável definem a agenda do ano.',   tag:'FUTURO',    col:'#A855F7' },
];

function buildTimeline() {
  const scroller = document.getElementById('timelineScroll');

  TL_EVENTS.forEach(ev => {
    const item = document.createElement('div');
    item.className = 'tl-item reveal';
    item.innerHTML = `
      <div class="tl-yr" style="background:${ev.col}20;color:${ev.col};border:1px solid ${ev.col}50">${ev.yr}</div>
      <div class="tl-card">
        <div class="tl-evt">${ev.ev}</div>
        <div class="tl-dsc">${ev.desc}</div>
        <span class="tl-tag" style="background:${ev.col}15;color:${ev.col};border:1px solid ${ev.col}35">${ev.tag}</span>
      </div>`;
    scroller.appendChild(item);
  });

  // Drag scroll
  let down = false, startX, scrollL;
  scroller.addEventListener('mousedown',  e => { down = true; startX = e.pageX - scroller.offsetLeft; scrollL = scroller.scrollLeft; });
  scroller.addEventListener('mouseleave', () => down = false);
  scroller.addEventListener('mouseup',    () => down = false);
  scroller.addEventListener('mousemove',  e => {
    if (!down) return;
    e.preventDefault();
    scroller.scrollLeft = scrollL - (e.pageX - scroller.offsetLeft - startX) * 1.4;
  });
}

buildTimeline();

// ────────────────────────────────────────────
// 7. INTERSECTION OBSERVER (reveals + counters)
// ────────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('visible');
    if (el.classList.contains('stat-card')) {
      animateCount(el);
      io.unobserve(el);
    }
  });
}, { threshold: 0.15 });

// Observe all reveal + stat-card elements (after DOM mutations)
function observeAll() {
  document.querySelectorAll('.reveal, .stat-card, .tl-item').forEach(el => io.observe(el));
}
// Small delay to ensure dynamic elements are in DOM
setTimeout(observeAll, 100);

// ────────────────────────────────────────────
// 8. NAV + SCROLL UTILITIES
// ────────────────────────────────────────────
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Nav active link tracking
const secEls = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;

  // active link
  let active = '';
  secEls.forEach(s => { if (y >= s.offsetTop) active = s.id; });
  navLinks.forEach(a => {
    const match = a.getAttribute('href') === `#${active}`;
    a.classList.toggle('active', match);
  });

  // nav background
  document.getElementById('navbar').style.background =
    window.scrollY > 60 ? 'rgba(4,11,24,0.97)' : 'rgba(4,11,24,0.70)';
}, { passive: true });