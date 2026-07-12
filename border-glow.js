// border-glow.js
// Vanilla JS port of the ReactBits <BorderGlow /> component.
// Attaches the glow effect + required DOM structure to any existing element.

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors, spread = 50) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent ${spread}%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

function getCenterOfElement(el) {
  const { width, height } = el.getBoundingClientRect();
  return [width / 2, height / 2];
}

function getEdgeProximity(el, x, y) {
  const [cx, cy] = getCenterOfElement(el);
  const dx = x - cx;
  const dy = y - cy;
  let kx = Infinity;
  let ky = Infinity;
  if (dx !== 0) kx = cx / Math.abs(dx);
  if (dy !== 0) ky = cy / Math.abs(dy);
  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
}

function getCursorAngle(el, x, y) {
  const [cx, cy] = getCenterOfElement(el);
  const dx = x - cx;
  const dy = y - cy;
  if (dx === 0 && dy === 0) return 0;
  const radians = Math.atan2(dy, dx);
  let degrees = radians * (180 / Math.PI) + 90;
  if (degrees < 0) degrees += 360;
  return degrees;
}

/**
 * Attaches the BorderGlow effect to an existing element.
 * Wraps the element's current children in the required inner structure,
 * so existing content (headings, links, etc.) is preserved.
 *
 * @param {HTMLElement} el - the card element (e.g. a .pro div)
 * @param {Object} [options]
 * @param {number} [options.edgeSensitivity=30]
 * @param {string} [options.glowColor='40 80 80'] - "H S L" string
 * @param {string} [options.backgroundColor='#120F17']
 * @param {number} [options.borderRadius=28]
 * @param {number} [options.glowRadius=40]
 * @param {number} [options.glowIntensity=1]
 * @param {number} [options.coneSpread=25]
 * @param {boolean} [options.animated=false] - play an intro sweep animation once
 * @param {string[]} [options.colors=['#c084fc','#f472b6','#38bdf8']]
 * @param {number} [options.fillOpacity=0.5]
 * @returns {Function} cleanup function - removes the listener (structure/classes are left in place)
 */
export function initBorderGlow(el, options = {}) {
  const {
    edgeSensitivity = 30,
    glowColor = '40 80 80',
    backgroundColor = '#120F17',
    borderRadius = 28,
    glowRadius = 40,
    glowIntensity = 1.0,
    coneSpread = 25,
    animated = false,
    colors = ['#c084fc', '#f472b6', '#38bdf8'],
    fillOpacity = 0.5,
    gradientSpread = 50 // lower this (e.g. 15-25) for small cards so colors don't blend into one
  } = options;

  // Wrap existing children in .border-glow-inner (only once, even if called twice)
  if (!el.querySelector(':scope > .border-glow-inner')) {
    const inner = document.createElement('div');
    inner.className = 'border-glow-inner';
    while (el.firstChild) {
      inner.appendChild(el.firstChild);
    }
    const edgeLight = document.createElement('span');
    edgeLight.className = 'edge-light';
    el.appendChild(edgeLight);
    el.appendChild(inner);
  }

  el.classList.add('border-glow-card');

  const glowVars = buildGlowVars(glowColor, glowIntensity);
  const gradientVars = buildGradientVars(colors, gradientSpread);

  el.style.setProperty('--card-bg', backgroundColor);
  el.style.setProperty('--edge-sensitivity', edgeSensitivity);
  el.style.setProperty('--border-radius', `${borderRadius}px`);
  el.style.setProperty('--glow-padding', `${glowRadius}px`);
  el.style.setProperty('--cone-spread', coneSpread);
  el.style.setProperty('--fill-opacity', fillOpacity);
  Object.entries(glowVars).forEach(([k, v]) => el.style.setProperty(k, v));
  Object.entries(gradientVars).forEach(([k, v]) => el.style.setProperty(k, v));

  function handlePointerMove(e) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = getEdgeProximity(el, x, y);
    const angle = getCursorAngle(el, x, y);

    el.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    el.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }
  el.addEventListener('pointermove', handlePointerMove);

  if (animated) {
    const angleStart = 110;
    const angleEnd = 465;
    el.classList.add('sweep-active');
    el.style.setProperty('--cursor-angle', `${angleStart}deg`);

    animateValue({ duration: 500, onUpdate: v => el.style.setProperty('--edge-proximity', v) });
    animateValue({
      ease: easeInCubic, duration: 1500, end: 50,
      onUpdate: v => el.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`)
    });
    animateValue({
      ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100,
      onUpdate: v => el.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`)
    });
    animateValue({
      ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => el.style.setProperty('--edge-proximity', v),
      onEnd: () => el.classList.remove('sweep-active')
    });
  }

  // Cleanup: removes the event listener (leaves DOM structure/classes intact,
  // since removing them would destroy your original content wrapping)
  return () => {
    el.removeEventListener('pointermove', handlePointerMove);
  };
}