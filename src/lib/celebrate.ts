type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
  color: string;
  size: number;
};

const colors = ['#4c32ff', '#d0e8ff', '#dff6f0', '#ffd8d8', '#e3dfff'];

export function celebrate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '100',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  });
  document.body.appendChild(canvas);

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  context.scale(pixelRatio, pixelRatio);

  const particles: Particle[] = Array.from({ length: 90 }, (_, index) => ({
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.58,
    vx: (Math.random() - 0.5) * 15,
    vy: -(Math.random() * 11 + 5),
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.35,
    color: colors[index % colors.length],
    size: Math.random() * 7 + 5,
  }));

  const start = performance.now();
  const draw = (now: number) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.28;
      particle.vx *= 0.99;
      particle.rotation += particle.spin;
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.fillRect(
        -particle.size / 2,
        -particle.size / 3,
        particle.size,
        particle.size * 0.66,
      );
      context.restore();
    });

    if (now - start < 1800) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  };

  requestAnimationFrame(draw);
}
