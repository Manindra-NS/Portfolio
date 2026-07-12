import { initBorderGlow } from './border-glow.js';

// Border glow runs immediately and independently — if the ball
// animation below fails to load for any reason, this still works.
document.querySelectorAll('.pro').forEach((el) => {
  initBorderGlow(el, {
    edgeSensitivity: 5,               // even lower - glow now covers almost the whole card, not just edges
    glowColor: '260 95% 55%',          // golden/amber halo, was deep violet
    backgroundColor: 'rgb(22, 9, 48)',    // keeps your original card fill/text contrast
    borderRadius: 20,                // matches your old border-radius: 20px
    glowRadius: 45,                   // bigger halo, was 25
    glowIntensity: 4,                // was 1.2 - much stronger now
    coneSpread: 45,                  // wider cone, was 35
    fillOpacity: 1,                  // push the colors[] mesh to full strength since it's now the star
    gradientSpread: 18,               // shrinks each color blob so all 3 stay distinct on a small card
    animated: false,
    colors: ['#00e5ff', '#ff00e5', '#7c3aed'] // gold, amber, dark orange - was cyan/magenta/purple
  });
});

// Ball animation loads via dynamic import so a failure here (CDN
// blocked, wrong protocol, WebGL unavailable, etc.) can't take down
// the border-glow code above. Check the browser console for the
// logged error if the balls don't show up.
const ballBgEl = document.getElementById('ball-bg');
if (ballBgEl) {
  import('./ballpit.js')
    .then(({ initBallpit }) => {
      initBallpit(ballBgEl, {
        count: 100,
        gravity: 0.01,
        friction: 0.9975,
        wallBounce: 0.95,
        followCursor: false,
        colors: [0xA855F7, 0xB497CF, 0x7c3aed]
      });
    })
    .catch((err) => {
      console.error('Ballpit animation failed to load:', err);
    });
}