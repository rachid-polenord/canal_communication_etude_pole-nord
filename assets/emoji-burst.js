/**
 * emoji-burst.js
 * Explosion d'émojis depuis le bouton cliqué.
 */

document.addEventListener('DOMContentLoaded', () => {

  const bursts = {
    btn1: ['💡', '✨', '🚀', '🎯', '⚡', '🌟'],
    btn2: ['💬', '👋', '🙌', '❓', '💥', '🎤'],
  };

  const style = document.createElement('style');
  style.textContent = `
    .emoji-particle {
      position: fixed;
      pointer-events: none;
      font-size: 24px;
      user-select: none;
      z-index: 9999;
      animation: emoji-fly var(--dur) ease-out forwards;
    }
    @keyframes emoji-fly {
      0%   { transform: translate(0, 0) scale(1);   opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function burst(e, emojis) {
    const count = 10;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.classList.add('emoji-particle');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const dist = 80 + Math.random() * 80;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 40;
      const dur = 0.6 + Math.random() * 0.4;

      el.style.setProperty('--tx', tx + 'px');
      el.style.setProperty('--ty', ty + 'px');
      el.style.setProperty('--dur', dur + 's');
      el.style.left = cx + 'px';
      el.style.top  = cy + 'px';

      document.body.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000);
    }
  }

  document.querySelector('.btn1')?.addEventListener('click', e => burst(e, bursts.btn1));
  document.querySelector('.btn2')?.addEventListener('click', e => burst(e, bursts.btn2));

});
