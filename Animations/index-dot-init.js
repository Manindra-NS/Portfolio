import { initDotField } from './dot-field.js';

const dotBgEl = document.getElementById('dot-bg');
if (dotBgEl) {
  initDotField(dotBgEl, {
    dotRadius: 1.5,
    dotSpacing: 14,
    bulgeStrength: 67,
    glowRadius: 160,
    sparkle: false,
    waveAmplitude: 0,
    cursorRadius: 500,
    cursorForce: 0.1,
    bulgeOnly: true,
    gradientFrom: '#A855F7',
    gradientTo: '#B497CF',
    glowColor: '#120F17'
  });
}