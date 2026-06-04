/**
 * animation.js
 * Fait tourner le logo du header et gère les effets visuels.
 * À placer dans le même dossier que index.html.
 */

document.addEventListener('DOMContentLoaded', () => {

  const logo = document.querySelector('.header img');
  if (!logo) return;

  // --- Keyframes injectés dynamiquement ---
  const style = document.createElement('style');
  style.textContent = `
    @keyframes logo-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // --- Application de l'animation ---
  Object.assign(logo.style, {
    animation: 'logo-spin 40s linear infinite',
    transformOrigin: 'center center',
    willChange: 'transform',
  });

  // --- Pause au survol (effet sympa sur mobile aussi via focus) ---
  logo.style.cursor = 'pointer';

  logo.addEventListener('mouseenter', () => {
    logo.style.animationPlayState = 'paused';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.animationPlayState = 'running';
  });

  // Pause/reprise au clic (utile mobile)
  let paused = false;
  logo.addEventListener('click', () => {
    paused = !paused;
    logo.style.animationPlayState = paused ? 'paused' : 'running';
  });

});
