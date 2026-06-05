document.addEventListener('DOMContentLoaded', () => {
  const srcA = 'assets/logo_pn.png';
  const srcB = 'assets/logo_pn3.png';

  const imgA = new Image();
  const imgB = new Image();
  let loaded = 0;

  const onLoadOrError = () => {
    loaded++;
    if (loaded === 2) launch([imgA.complete ? imgA : null, imgB.complete ? imgB : null].filter(Boolean));
  };

  imgA.onload = onLoadOrError;
  imgA.onerror = onLoadOrError;
  imgB.onload = onLoadOrError;
  imgB.onerror = onLoadOrError;
  imgA.src = srcA;
  imgB.src = srcB;

  function launch(logos) {
    if (!logos.length) {
      console.warn('confetti: aucune image chargée');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed; inset: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 50;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: canvas.width * 0.1 + Math.random() * canvas.width * 0.8,
        y: -20 - Math.random() * 200,
        size: 20 + Math.random() * 24,
        speedX: (Math.random() - 0.5) * 3,
        speedY: 2 + Math.random() * 3,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.12,
        opacity: 0.85 + Math.random() * 0.15,
        img: logos[i % logos.length],
      });
    }

    let rafId;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        p.speedX += (Math.random() - 0.5) * 0.1;
        if (p.y < canvas.height + 50) alive = true;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      if (alive) rafId = requestAnimationFrame(draw);
      else {
        canvas.remove();
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(rafId);
      }
    }
    draw();
  }
});
