import { initGlareHover } from './glare-hover.js';
import { initFerrofluid } from './ferrofluid.js';
import { initPrism } from './prism.js';

const ferrofluidEl = document.getElementById('ferrofluid-bg');
if (ferrofluidEl) {
  initFerrofluid(ferrofluidEl, {
    colors: ['#ffffff', '#ffffff', '#ffffff'],
    speed: 0.5,
    scale: 1.6,
    turbulence: 1,
    fluidity: 0.1,
    rimWidth: 0.2,
    sharpness: 2.5,
    shimmer: 1.5,
    glow: 2,
    flowDirection: 'down',
    opacity: 1,
    mouseInteraction: true,
    mouseStrength: 1,
    mouseRadius: 0.35
  });
}

// const prismEl = document.getElementById('prism-bg');
// if (prismEl) {
//   initPrism(prismEl, {
//     animationType: 'rotate',
//     timeScale: 0.5,
//     height: 3.5,
//     baseWidth: 5.5,
//     scale: 3.6,
//     hueShift: 0,
//     colorFrequency: 1,
//     noise: 0,
//     glow: 1
//   });
// }

document.querySelectorAll('.pro').forEach((el) => {
  initGlareHover(el, {
    background: '#14142b',      // dark navy, matches your site's dark theme
    borderRadius: '20px',        // matches the border-radius your other cards use
    borderColor: '#3a3a5c',
    glareColor: '#ffffff',
    glareOpacity: 0.35,
    glareAngle: -30,
    glareSize: 300,
    transitionDuration: 700,
    playOnce: false              // glare replays every time you hover, not just once
  });
});