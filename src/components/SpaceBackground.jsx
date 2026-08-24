import { useRef, useEffect } from 'react';

/* ── Constants ── */
const STAR_COUNT = 200;
const COMET_INTERVAL_MS = 3200;
const COMET_SPEED = 4.5;
const COMET_LENGTH = 180;
const STAR_MIN_R = 0.3;
const STAR_MAX_R = 1.4;

/* ── Helpers ── */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ── Component ── */
export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    /* ── Resize ── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    /* ── Stars ── */
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(STAR_MIN_R, STAR_MAX_R),
      alpha: rand(0.15, 0.9),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.003, 0.018),
    }));

    /* ── Comets ── */
    const comets = [];
    const spawnComet = () => {
      comets.push({
        x: rand(-100, W + 100),
        y: -60,
        vx: COMET_SPEED * rand(0.6, 1.0),
        vy: COMET_SPEED * rand(0.8, 1.4),
        life: 1,
        decay: rand(0.004, 0.008),
        length: COMET_LENGTH * rand(0.7, 1.3),
      });
    };
    const cometTimer = setInterval(spawnComet, COMET_INTERVAL_MS);

    /* ── Animate ── */
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Stars — twinkling */
      for (const s of stars) {
        s.phase += s.speed;
        const flicker = 0.5 + 0.5 * Math.sin(s.phase + t * 0.01);
        const a = s.alpha * (0.3 + 0.7 * flicker);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.fill();
      }

      /* Comets — diagonal streaks with fading silver tails */
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        c.life -= c.decay;
        if (c.life <= 0) { comets.splice(i, 1); continue; }

        const tailX = c.x - (c.vx / c.vy) * c.length * 0.6;
        const tailY = c.y - c.length * 0.6;

        const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${(0.95 * c.life).toFixed(3)})`);
        grad.addColorStop(0.15, `rgba(210,210,220,${(0.6 * c.life).toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(180,180,195,${(0.25 * c.life).toFixed(3)})`);
        grad.addColorStop(1, `rgba(160,160,175,0)`);

        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.stroke();

        /* Head glow */
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(0.9 * c.life).toFixed(3)})`;
        ctx.fill();
      }

      t++;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      clearInterval(cometTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#000000' }}
    />
  );
}
