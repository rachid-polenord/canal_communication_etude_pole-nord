/**
 * confetti.js
 * Confettis en forme de logo_pn.png
 * Technique : particules canvas dessinées manuellement, sans canvas-confetti
 */

document.addEventListener('DOMContentLoaded', () => {

  const img = new Image();
  img.src = 'assets/logo_pn.png';
  img.onload = () => launch(img);
  img.onerror = () => console.warn('confetti.js : logo_pn.png introuvable');

  function launch(logo) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed; inset: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Crée les particules
    const COUNT = 80;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x:      canvas.width  * 0.1 + Math.random() * canvas.width * 0.8,
        y:      -20 - Math.random() * 200,
        size:   20 + Math.random() * 24,
        speedX: (Math.random() - 0.5) * 3,
        speedY: 2 + Math.random() * 3,
        rot:    Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.12,
        opacity: 0.85 + Math.random() * 0.15,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        p.x   += p.speedX;
        p.y   += p.speedY;
        p.rot += p.rotSpeed;
        p.speedX += (Math.random() - 0.5) * 0.1; // légère dérive

        if (p.y < canvas.height + 50) alive = true;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(logo, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      if (alive) {
        animId = requestAnimationFrame(draw);
      } else {
        canvas.remove();
        window.removeEventListener('resize', resize);
      }
    }

    draw();
  }

});
