/* =====================================================================
   PERSONALISATION – edit only this block. Everything else just works.
   ===================================================================== */
const CONFIG = {
  herName: "Beautiful",              // her name (certificate + celebration)
  nickname: "sweetheart",            // her nickname
  myName: "Your Valentine",          // your name
  music: "assets/love-song.mp3",     // background song
  voice: "assets/voice-message.mp3", // your recording
  musicVolume: 0.6,
  photos: ["assets/images/photo1.jpg", "assets/images/photo2.jpg", "assets/images/photo3.jpg", "assets/images/photo4.jpg"],
  captions: ["Your smile is my favourite view.", "Some moments deserve to last forever.",
             "Beautiful memories begin with beautiful people.", "Here's to many more moments together."],
  questions: [
    { q: "Do you believe in love at first sight?", a: ["Yes, absolutely ❤️", "Maybe, convince me 🙈"], r: ["A true romantic. I knew it. 💘", "Challenge accepted. 😏"] },
    { q: "What is your idea of a perfect romantic moment?", a: ["A romantic dinner under the stars 🌹", "Long conversations and cuddles 🤗"], r: ["Candlelight and stars. Noted. 🕯️", "Best answer so far. 🥰"] },
    { q: "If someone wanted to make you smile every single day, would you let them?", a: ["Of course! 🥹", "I wouldn't mind that. 💕"], r: ["Good, because I intend to. 😊", "Playing it cool. I see you. 😌"] },
    { q: "How do you feel about random romantic surprises?", a: ["I LOVE surprises! 🎁", "It depends on who is surprising me. 😂"], r: ["Perfect. You'll love what's next. 🎉", "I like to think I'm on the shortlist. 😂"] },
    { q: "Are you ready for someone to make you feel extra special?", a: ["I'm ready! ❤️", "Tell me what you have planned! 👀"], r: ["Then hold on tight. 💓", "Patience, gorgeous. 💓"] }
  ],
  secrets: ["Psst... someone thinks you're incredibly special. ❤️", "Your smile deserves its own award. 🥹",
            "You have no idea how much happiness you bring.", "If beauty were a crime, you'd be serving life. 😂",
            "This whole website was made with you in mind. 🌹"],
  proposalLine: "I've been waiting for the perfect moment to ask you something...",
  proposalAsk: "Will You Be My Valentine? ❤️",
  celebration: ["YAAAAAAAAAY!!! 🥹❤️", "YOU JUST MADE ME THE HAPPIEST PERSON ALIVE!",
                "I promise to make this Valentine's Day as beautiful and special as you are.\n\nHere's to us, {nick}! 💋🌹"],
  signature: "Signed with love",
  letter: `To My Beautiful Valentine,

I don't know what the future holds, but I know that every beautiful moment becomes even better when shared with someone special.

You deserve happiness, laughter, peace, affection, and all the wonderful things life has to offer.

Thank you for being you.

I hope this is the beginning of something beautiful.

With love, always. ❤️🌹`,
  wheel: ["Unlimited hugs 🤗", "Unlimited kisses 💋", "A romantic date 🌹", "Random surprises 🎁", "Endless compliments 🥰", "Movie night together 🍿", "VIP princess treatment 👑", "One very special Valentine ❤️"],
  share: { text: "She said YES! 💖 Happy Valentine's Day", url: "" },   // url blank = this page's own address
  theme: { gold: "#d8b878", rose: "#e8a598", wine: "#3b0a17", blush: "#f7d4d8", ivory: "#fbf3e6", red: "#b3122f" }
};

/* ============================ HELPERS ============================ */
const $ = id => document.getElementById(id);
const wait = ms => new Promise(r => setTimeout(r, ms));
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (a, b) => a + Math.random() * (b - a);
const type = (el, t, s = 42) => new Promise(r => { el.textContent = ''; let i = 0; (function f(){ el.textContent = t.slice(0, ++i); i < t.length && !calm ? setTimeout(f, s) : (el.textContent = t, r()); })(); });
Object.entries(CONFIG.theme).forEach(([k, v]) => document.documentElement.style.setProperty('--' + k, v));
/* SVG icon helper: ic('heart'), ic('fb', true) for filled brand icons */
const ic = (n, f) => `<svg class="i${f ? ' f' : ''}" aria-hidden="true"><use href="#${f ? 'b-' : 'i-'}${n}"/></svg>`;
const fill = s => s.replace('{nick}', CONFIG.nickname).replace('{name}', CONFIG.herName);

/* ===================== PARTICLES (one canvas) ===================== */
const cv = $('fx'), ctx = cv.getContext('2d');
let W, H, mood = 1, parts = [];
const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
addEventListener('resize', resize); resize();
function spawn(kind, x, y, col){
  if(parts.length > 320) return;
  const p = { kind, x: x ?? rnd(0, W), y: y ?? -20, s: rnd(8, 18), vx: rnd(-.5, .5), vy: rnd(.8, 2), r: rnd(0, 6), vr: rnd(-.04, .04), life: 1, ph: rnd(0, 6), col: col || CONFIG.theme.gold };
  if(kind === 'heart'){ p.y = H + 20; p.vy = -rnd(.6, 1.5); p.col = Math.random() < .5 ? CONFIG.theme.gold : CONFIG.theme.rose; }
  if(kind === 'dust'){ p.s = rnd(1, 2.6); p.y = y ?? rnd(0, H); p.vy = rnd(-.3, .3); }
  if(kind === 'burst'){ const a = rnd(0, 6.3), v = rnd(2, 8); p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v - 2; p.s = rnd(6, 14); }
  if(kind === 'spark'){ const a = rnd(0, 6.3), v = rnd(1, 6); p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v; p.s = 2; }
  parts.push(p);
}
const burst = (x, y, n = 14, kind = 'burst') => { for(let i = 0; i < n; i++) spawn(kind, x, y, kind === 'spark' ? CONFIG.theme.gold : (Math.random() < .5 ? CONFIG.theme.rose : '#e04a5f')); };
function heart(x, y, s, c, a){ ctx.save(); ctx.translate(x, y); ctx.globalAlpha = a; ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, s*.3); ctx.bezierCurveTo(-s, -s*.4, -s*.5, -s, 0, -s*.4); ctx.bezierCurveTo(s*.5, -s, s, -s*.4, 0, s*.3); ctx.fill(); ctx.restore(); }
(function loop(){
  ctx.clearRect(0, 0, W, H);
  if(!calm){ if(Math.random() < .05*mood) spawn('petal'); if(Math.random() < .02*mood) spawn('heart'); if(Math.random() < .08*mood) spawn('dust'); }
  parts = parts.filter(p => p.life > 0 && p.y < H + 50 && p.y > -80);
  for(const p of parts){
    p.ph += .03; p.r += p.vr; p.x += p.vx + (p.kind === 'petal' ? Math.sin(p.ph) * .7 : 0); p.y += p.vy;
    if(p.kind === 'burst'){ p.vy += .15; p.life -= .01; heart(p.x, p.y, p.s, p.col, p.life); }
    else if(p.kind === 'spark'){ p.vy += .05; p.life -= .014; ctx.globalAlpha = p.life; ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, 3, 3); ctx.globalAlpha = 1; }
    else if(p.kind === 'heart') heart(p.x, p.y, p.s, p.col, .6);
    else if(p.kind === 'dust'){ ctx.globalAlpha = .3 + Math.sin(p.ph * 3) * .3; ctx.fillStyle = CONFIG.theme.gold; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1; }
    else { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(1, .5 + Math.abs(Math.sin(p.ph)) * .5); ctx.fillStyle = 'rgba(190,40,70,.75)'; ctx.beginPath(); ctx.ellipse(0, 0, p.s * .5, p.s * .8, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
  }
  requestAnimationFrame(loop);
})();
function fireworks(n = 6){ let i = 0; const t = setInterval(() => { burst(rnd(W*.15, W*.85), rnd(H*.1, H*.5), 40, 'spark'); burst(rnd(W*.15, W*.85), rnd(H*.1, H*.5), 12); if(++i >= n) clearInterval(t); }, 350); }

/* ============================== MUSIC ============================== */
const song = new Audio(CONFIG.music); song.loop = true; song.volume = 0;
let fadeT, wantVol = CONFIG.musicVolume;
function fade(to, ms = 2000){ clearInterval(fadeT); const from = song.volume, steps = 20; let i = 0;
  fadeT = setInterval(() => { i++; song.volume = Math.max(0, Math.min(1, from + (to - from) * i / steps)); if(i >= steps){ clearInterval(fadeT); if(to === 0 && wantVol === 0) song.pause(); } }, ms / steps); }
function startMusic(){ song.play().then(() => { $('mus').classList.add('show'); fade(wantVol, 3000); }).catch(() => {}); }
$('mus').onclick = () => { const off = !song.paused; $('mus').classList.toggle('off', off); $('mus').innerHTML = ic(off ? 'mute' : 'vol');
  if(off){ wantVol = 0; fade(0, 800); } else { wantVol = CONFIG.musicVolume; song.play().catch(() => {}); fade(wantVol, 800); } };

/* ====================== MODAL + SECRET HEARTS ====================== */
const modal = $('modal'), openModal = h => { $('mb').innerHTML = h; modal.classList.add('on'); $('mx').focus(); };
$('mx').onclick = () => modal.classList.remove('on');
modal.onclick = e => { if(e.target === modal) modal.classList.remove('on'); };
addEventListener('keydown', e => e.key === 'Escape' && modal.classList.remove('on'));
document.querySelectorAll('.secret').forEach(b => { b.innerHTML = ic('heart'); b.onclick = e => { openModal(CONFIG.secrets[b.dataset.i % CONFIG.secrets.length]); burst(e.clientX, e.clientY, 8); }; });

/* ======================= SCREEN NAVIGATION ======================= */
const inits = {};
function go(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === id));
  $('bar').classList.toggle('show', id === 'quiz');
  const n = { intro: 1, verify: 1.2, quiz: 1.4, compat: 1.5, game: 1.6, wheel: 1.8, garden: 2, gallery: 2.2, voice: 2.5, proposal: 4, yes_s: 6 }[id]; if(n) mood = n;
  if(id !== 'game') stopGame();
  inits[id] && setTimeout(inits[id], 700);
}
document.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if(b) go(b.dataset.go); });

/* ============================== 1 INTRO ============================== */
inits.intro = async () => {
  await wait(1200); await type($('t1'), 'Some moments are worth making unforgettable...', 55);
  await wait(900); await type($('t2'), 'And this one is especially for you. ❤️', 60);
  await wait(600); $('enter').classList.remove('hid');
};
$('enter').onclick = () => { startMusic(); burst(innerWidth/2, innerHeight/2, 24); go('verify'); };

/* ========================== 2 VERIFICATION ========================== */
document.querySelectorAll('#vbtns .btn').forEach(b => b.onclick = async () => {
  $('vbtns').style.display = 'none'; $('stamp').classList.add('show'); burst(innerWidth/2, innerHeight/2, 20, 'spark');
  await wait(1200); $('vmsg').classList.remove('hid'); await wait(3000); go('quiz'); startQuiz();
});

/* ============================== 3 QUIZ ============================== */
const glows = ['rgba(216,184,120,.28)', 'rgba(232,100,120,.28)', 'rgba(247,212,216,.22)', 'rgba(179,18,47,.35)', 'rgba(216,160,120,.3)'];
let qi = 0, locked = false;
function startQuiz(){ qi = 0; showQ(); }
function showQ(){
  const q = CONFIG.questions[qi]; $('qr').classList.remove('show'); $('qa').innerHTML = '';
  document.body.style.setProperty('--g', glows[qi % glows.length]);
  $('barfill').style.width = (qi / CONFIG.questions.length * 100) + '%';
  const g = document.querySelector('#quiz .glass'); g.classList.remove('qin'); void g.offsetWidth; g.classList.add('qin');
  $('qt').textContent = q.q;
  q.a.forEach((t, k) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = t; b.onclick = e => pick(k, e); $('qa').appendChild(b); });
}
async function pick(k, e){
  if(locked) return; locked = true;
  document.querySelectorAll('#qa .btn').forEach(b => b.disabled = true);
  burst(e.clientX, e.clientY); $('qr').textContent = CONFIG.questions[qi].r[k]; $('qr').classList.add('show');
  $('barfill').style.width = ((qi + 1) / CONFIG.questions.length * 100) + '%';
  await wait(2000); locked = false;
  ++qi < CONFIG.questions.length ? showQ() : go('compat');
}

/* ========================= 4 COMPATIBILITY ========================= */
inits.compat = async () => {
  const t0 = performance.now(), D = 3500;
  await new Promise(res => (function f(t){ const k = Math.min(1, (t - t0) / D), v = 99.9 * (1 - Math.pow(1 - k, 3));
    $('pct').textContent = v.toFixed(1) + '%'; $('rf').style.strokeDashoffset = 327 * (1 - v / 100); k < 1 ? requestAnimationFrame(f) : res(); })(t0));
  burst(innerWidth/2, innerHeight/2, 30, 'spark');
  $('cm1').classList.remove('hid'); await wait(1500); $('cm2').classList.remove('hid'); await wait(1000);
  document.querySelector('#compat [data-go]').classList.remove('hid');
};

/* ============================ 5 HEART GAME ============================ */
let gScore = 0, gTime = 25, gTimer, gSpawn;
function stopGame(){ clearInterval(gTimer); clearInterval(gSpawn); }
function startGame(){
  stopGame(); gScore = 0; gTime = 25; $('gs').textContent = '0/5'; $('gt').textContent = gTime; $('field').innerHTML = '';
  $('gretry').classList.add('hid'); $('gwin').classList.add('hid'); $('field').style.display = 'block';
  gSpawn = setInterval(() => {
    const h = document.createElement('button'); h.className = 'fh'; h.textContent = '❤️'; h.setAttribute('aria-label', 'Catch heart');
    h.style.left = rnd(5, 85) + '%'; h.style.animationDuration = rnd(4, 6.5) + 's'; h.style.setProperty('--dx', rnd(-60, 60) + 'px');
    h.onanimationend = () => h.remove();
    h.onpointerdown = e => { e.preventDefault(); const r = h.getBoundingClientRect(); burst(r.left + r.width/2, r.top + r.height/2, 12); h.remove(); $('gs').textContent = (++gScore) + '/5'; if(gScore >= 5) win(); };
    $('field').appendChild(h);
  }, 650);
  gTimer = setInterval(() => { $('gt').textContent = --gTime; if(gTime <= 0){ stopGame(); $('field').style.display = 'none'; $('gretry').classList.remove('hid'); $('ginfo').textContent = "Time's up! Hearts are shy. Try again?"; } }, 1000);
}
function win(){ stopGame(); $('field').style.display = 'none'; $('gwin').classList.remove('hid'); fireworks(3); }
inits.game = () => { $('ginfo').textContent = 'Catch five floating hearts to unlock your next surprise!'; startGame(); };
$('gretry').onclick = startGame;

/* ============================== 6 WHEEL ============================== */
let rot = 0, spinning = false;
CONFIG.wheel.forEach((l, i) => { const s = document.createElement('span'); s.style.transform = `rotate(${i * 45 + 22.5}deg)`; s.textContent = l.split(' ').pop(); $('wh').appendChild(s); });
$('spin').onclick = () => {
  if(spinning) return; spinning = true; rot += 1800 + Math.floor(Math.random() * 360); $('wh').style.transform = `rotate(${rot}deg)`;
  setTimeout(() => { spinning = false; const i = Math.floor(((360 - rot % 360) % 360) / 45), l = CONFIG.wheel[i];
    openModal(`<b>THE UNIVERSE HAS DECIDED: ${l.toUpperCase()}!</b><p style="margin:12px auto">Honestly, you deserve it.</p>`);
    fireworks(2); $('wnext').classList.remove('hid'); }, calm ? 100 : 5100);
};

/* ============================== 7 GARDEN ============================== */
let roses = 0;
$('plant').onclick = () => {
  const x = rnd(40, 360), h = rnd(70, 110), top = 200 - h, ns = 'http://www.w3.org/2000/svg', g = document.createElementNS(ns, 'g');
  g.innerHTML = `<path class="stem" d="M${x} 200 Q${x + 12} ${200 - h / 2} ${x} ${top}"/>
    <ellipse class="lf" cx="${x + 12}" cy="${200 - h * .35}" rx="14" ry="6" transform="rotate(-30 ${x} ${200 - h * .35})"/>
    <ellipse class="lf" cx="${x - 12}" cy="${200 - h * .55}" rx="14" ry="6" transform="rotate(30 ${x} ${200 - h * .55})"/>
    <g class="bl"><circle cx="${x}" cy="${top}" r="15" fill="#8e1030"/><circle cx="${x - 5}" cy="${top - 3}" r="10" fill="#b3122f"/><circle cx="${x + 4}" cy="${top - 2}" r="7" fill="#d4284a"/><circle cx="${x}" cy="${top}" r="3.5" fill="#f08aa0"/></g>`;
  $('soil').appendChild(g);
  setTimeout(() => { const r = $('soil').getBoundingClientRect(), k = r.width / 400; burst(r.left + x * k, r.top + top * k, 18, 'spark'); }, 2000);
  if(++roses >= 4){ $('gmsg').classList.remove('hid'); $('gnext').classList.remove('hid'); }
};

/* ============================== 8 GALLERY ============================== */
CONFIG.photos.forEach((src, i) => {
  const b = document.createElement('button'); b.className = 'pol'; b.setAttribute('aria-label', 'Open photo: ' + CONFIG.captions[i]);
  const img = new Image(); img.alt = CONFIG.captions[i]; img.src = src;
  const ph = () => { const d = document.createElement('div'); d.className = 'ph'; d.innerHTML = ic('heart'); return d; };
  img.onerror = () => img.replaceWith(ph());
  b.append(img, CONFIG.captions[i]);
  b.onclick = e => { const im = b.querySelector('img'); burst(e.clientX, e.clientY, 10);
    openModal((im ? `<img src="${src}" alt="">` : `<div class="ph" style="width:220px;margin:auto">${ic('heart')}</div>`) + `<p style="margin:12px auto">${CONFIG.captions[i]}</p>`); };
  $('gal').appendChild(b);
});

/* ============================== 9 VOICE ============================== */
const va = $('vaud'); va.src = CONFIG.voice;
const fmt = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
$('vplay').onclick = () => { if(va.paused){ va.play().catch(() => $('vnote').classList.remove('hid')); } else va.pause(); };
va.onplay = () => { $('vplay').innerHTML = ic('pause'); $('waves').classList.add('go'); if(!song.paused) fade(wantVol * .3, 800); };
va.onpause = va.onended = () => { $('vplay').innerHTML = ic('play'); $('waves').classList.remove('go'); if(!song.paused) fade(wantVol, 1200); };
va.ontimeupdate = () => { $('vtime').textContent = fmt(va.currentTime); if(va.duration) $('vseek').value = va.currentTime / va.duration * 100; };
$('vseek').oninput = () => { if(va.duration) va.currentTime = $('vseek').value / 100 * va.duration; };
va.onerror = () => $('vnote').classList.remove('hid');

/* ============================ 10 COUNTDOWN ============================ */
inits.countdown = async () => {
  va.pause(); document.body.style.setProperty('--g', 'rgba(0,0,0,0)'); if(!song.paused) fade(wantVol * .4, 1500);
  await type($('c1'), 'Okay, beautiful...', 60); await wait(700); await type($('c2'), 'I think it\'s finally time.', 60); await wait(1000);
  for(const n of [3, 2, 1]){ $('cn').textContent = n; $('cn').classList.remove('tick'); void $('cn').offsetWidth; $('cn').classList.add('tick'); burst(innerWidth/2, innerHeight/2, 10, 'spark'); await wait(1000); }
  if(!song.paused) fade(wantVol, 2500); go('proposal');
};

/* ============================ 11 PROPOSAL ============================ */
inits.proposal = async () => {
  document.body.style.setProperty('--g', 'rgba(216,184,120,.35)');
  await type($('pl'), CONFIG.proposalLine, 55); await wait(1800);
  $('pl').classList.add('hid'); $('pq').textContent = CONFIG.proposalAsk; $('ask').classList.remove('hid'); armNo = true;
};

/* ------- The escaping NO button ------- */
const no = $('no'), yes = $('yes'), taunt = $('taunt');
const taunts = ['Too slow! 😂', "You can't catch me! 💨", 'Wrong button, sweetheart! ❤️', 'Are you really sure? 🥺', 'Nice try! 😭', 'Just press YES already! 💗'];
let armNo = false, dodges = 0;
function flee(px, py){
  const r = no.getBoundingClientRect(), y = yes.getBoundingClientRect(), m = 14; let x, t, n = 0;
  no.classList.add('fl');
  do { x = rnd(m, innerWidth - r.width - m); t = rnd(m + 40, innerHeight - r.height - m); n++; }
  while(n < 50 && (Math.hypot(x + r.width/2 - px, t + r.height/2 - py) < 220 ||                      // far from the pointer
         (x < y.right + m && x + r.width > y.left - m && t < y.bottom + m && t + r.height > y.top - m))); // never on top of YES
  no.style.left = x + 'px'; no.style.top = t + 'px'; no.style.transform = `rotate(${rnd(-18, 18)}deg)`;
  dodges++; if(dodges % 2 === 0 || dodges === 1){ taunt.textContent = taunts[Math.floor(rnd(0, taunts.length))];
    taunt.style.left = Math.min(x, innerWidth - 220) + 'px'; taunt.style.top = Math.max(t - 30, 4) + 'px'; taunt.style.opacity = 1; setTimeout(() => taunt.style.opacity = 0, 1400); }
  yes.style.transform = `scale(${Math.min(1 + dodges * .03, 1.4)})`;
}
function near(e, d){ const r = no.getBoundingClientRect(), dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right), dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom); return Math.hypot(dx, dy) < d; }
['pointermove', 'pointerdown'].forEach(ev => addEventListener(ev, e => { if(armNo && near(e, ev === 'pointerdown' ? 90 : 130)) flee(e.clientX, e.clientY); }, { passive: true }));
['pointerdown', 'touchstart', 'mousedown', 'click', 'focus'].forEach(ev => no.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); const t = e.touches ? e.touches[0] : e; flee(t.clientX ?? innerWidth/2, t.clientY ?? innerHeight/2); no.blur(); }, { passive: false }));
addEventListener('resize', () => { if(!no.classList.contains('fl')) return; const r = no.getBoundingClientRect();
  no.style.left = Math.max(14, Math.min(r.left, innerWidth - r.width - 14)) + 'px'; no.style.top = Math.max(14, Math.min(r.top, innerHeight - r.height - 14)) + 'px'; });

/* ============================ 12 CELEBRATION ============================ */
yes.onclick = async () => {
  armNo = false; no.style.display = 'none'; go('yes_s'); const r = yes.getBoundingClientRect(); burst(r.left + r.width/2, r.top, 60); fireworks(10);
  const t = setInterval(() => burst(rnd(0, W), rnd(0, H * .6), 20), 500); setTimeout(() => clearInterval(t), 8000);
  await wait(900); await type($('y1'), CONFIG.celebration[0], 60); await type($('y2'), CONFIG.celebration[1], 35);
  await wait(500); await type($('y3'), fill(CONFIG.celebration[2]), 40); $('ynext').classList.remove('hid');
};

/* ============================ 13 CERTIFICATE ============================ */
inits.cert = () => { $('cn_name').textContent = CONFIG.herName; $('csig').textContent = CONFIG.signature + ', ' + CONFIG.myName;
  $('cdate').textContent = 'Accepted on ' + new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); };
$('dl').onclick = () => { document.title = 'Valentine Certificate - ' + CONFIG.herName; window.print(); }; // choose "Save as PDF" in the print dialog

/* ============================== 14 LETTER ============================== */
$('paper').textContent = CONFIG.letter;
$('env').onclick = () => { $('env').classList.add('hid'); $('paper').classList.remove('hid'); burst(innerWidth/2, innerHeight/2, 30, 'spark'); mood = 3; };

inits.intro();

/* ===================== HEADING ICONS (one per section) ===================== */
const HI = { verify: 'shield', quiz: 'sparkles', compat: 'heart', game: 'heart', wheel: 'star', garden: 'flower', gallery: 'camera', voice: 'phones', cert: 'award', letter: 'mail', yes_s: 'gift' };
Object.entries(HI).forEach(([id, n]) => $(id).insertAdjacentHTML('afterbegin', `<svg class="hi" aria-hidden="true"><use href="#i-${n}"/></svg>`));

/* ========================= SHARE BUTTONS (certificate) ========================= */
const shareUrl = () => CONFIG.share.url || location.href.split('#')[0];
const copyLink = msg => navigator.clipboard.writeText(shareUrl()).then(() => openModal(msg || 'Link copied! 🔗'), () => prompt('Copy this link:', shareUrl()));
function buildShare(){
  const T = encodeURIComponent(CONFIG.share.text), U = encodeURIComponent(shareUrl());
  const nets = [
    ['WhatsApp', '#25D366', 'wa', `https://wa.me/?text=${T}%20${U}`], ['Facebook', '#1877F2', 'fb', `https://www.facebook.com/sharer/sharer.php?u=${U}`],
    ['X', '#000', 'x', `https://twitter.com/intent/tweet?text=${T}&url=${U}`], ['Telegram', '#26A5E4', 'tg', `https://t.me/share/url?url=${U}&text=${T}`],
    ['Email', '#b3122f', 'mail', `mailto:?subject=${T}&body=${T}%20${U}`] ];
  $('shr').innerHTML = nets.map(([n, c, k, h]) => `<a class="sb" style="--c:${c}" href="${h}" target="_blank" rel="noopener" aria-label="Share on ${n}">${ic(k, k !== 'mail')}</a>`).join('') +
    `<button class="sb" id="s-ig" style="--c:linear-gradient(45deg,#f09433,#dc2743,#bc1888)" aria-label="Share on Instagram">${ic('ig')}</button>` +
    `<button class="sb" id="s-cp" style="--c:#7a1230" aria-label="Copy link">${ic('link')}</button>` +
    `<button class="sb" id="s-more" style="--c:#8a6d2f" aria-label="More sharing options">${ic('share')}</button>`;
  $('s-ig').onclick = () => copyLink('Link copied! Paste it into an Instagram story or DM. 📸'); // Instagram has no web share URL
  $('s-cp').onclick = () => copyLink();
  $('s-more').onclick = () => navigator.share ? navigator.share({ title: CONFIG.share.text, text: CONFIG.share.text, url: shareUrl() }).catch(() => {}) : copyLink();
}
buildShare();
