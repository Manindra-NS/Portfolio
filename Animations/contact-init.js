// Loaded via dynamic import with a catch, so a failure here (CDN
// blocked, wrong protocol, WebGL unavailable, etc.) can't take down
// anything else running on this page. Check the browser console for
// the logged error if the animation doesn't show up.
const lineWavesEl = document.getElementById('line-waves-bg');
if (lineWavesEl) {
  import('./line-waves.js')
    .then(({ initLineWaves }) => {
      initLineWaves(lineWavesEl, {
        speed: 0.3,
        innerLineCount: 32,
        outerLineCount: 36,
        warpIntensity: 1,
        rotation: -45,
        edgeFadeWidth: 0,
        colorCycleSpeed: 1,
        brightness: 0.2,
        color1: '#ff00c8',
        color2: '#ade2ff',
        color3: '#fed3ff',
        enableMouseInteraction: true,
        mouseInfluence: 2,
        opacity: 0.8
      });
    })
    .catch((err) => {
      console.error('LineWaves animation failed to load:', err);
    });
}