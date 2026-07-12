// glare-hover.js
// Vanilla JS port of the ReactBits <GlareHover /> component.
// This effect is pure CSS (see glare-hover.css) - this helper just computes
// the rgba glare color and sets the CSS custom properties on your element.

/**
 * Applies the GlareHover effect to an existing element.
 * Unlike Aurora/DotField/ColorBends, this has no animation loop or event
 * listeners - the shimmer is driven entirely by :hover in CSS.
 *
 * @param {HTMLElement} el - the element to apply the effect to (e.g. a .pro card)
 * @param {Object} [options]
 * @param {string} [options.background='#000'] - card background (any valid CSS color)
 * @param {string} [options.borderRadius='10px']
 * @param {string} [options.borderColor='#333']
 * @param {string} [options.glareColor='#ffffff'] - hex color for the glare streak
 * @param {number} [options.glareOpacity=0.5]
 * @param {number} [options.glareAngle=-45] - degrees
 * @param {number} [options.glareSize=250] - percent
 * @param {number} [options.transitionDuration=650] - ms
 * @param {boolean} [options.playOnce=false] - if true, glare only animates in (not out) on repeat hovers
 * @param {string} [options.width='100%'] - defaults to 100% so it fills its parent's existing size
 * @param {string} [options.height='100%']
 */
export function initGlareHover(el, options = {}) {
  const {
    width = '100%',
    height = '100%',
    background = '#000',
    borderRadius = '10px',
    borderColor = '#333',
    glareColor = '#ffffff',
    glareOpacity = 0.5,
    glareAngle = -45,
    glareSize = 250,
    transitionDuration = 650,
    playOnce = false
  } = options;

  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  el.classList.add('glare-hover');
  if (playOnce) {
    el.classList.add('glare-hover--play-once');
  }

  el.style.setProperty('--gh-width', width);
  el.style.setProperty('--gh-height', height);
  el.style.setProperty('--gh-bg', background);
  el.style.setProperty('--gh-br', borderRadius);
  el.style.setProperty('--gh-angle', `${glareAngle}deg`);
  el.style.setProperty('--gh-duration', `${transitionDuration}ms`);
  el.style.setProperty('--gh-size', `${glareSize}%`);
  el.style.setProperty('--gh-rgba', rgba);
  el.style.setProperty('--gh-border', borderColor);
}