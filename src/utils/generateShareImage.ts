import { hexToRgb } from './colour';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!src) { reject(new Error('no source')); return; }
    const img = new Image();
    if (!src.startsWith('data:')) img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('could not load'));
    img.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const ir = img.width / img.height;
  const cr = w / h;
  let sw, sh, sx, sy;
  if (ir > cr) { sh = img.height; sw = sh * cr; sx = (img.width - sw) / 2; sy = 0; }
  else { sw = img.width; sh = sw / cr; sx = 0; sy = (img.height - sh) / 2; }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Composites hero + brand colour wash + logo plate into a 1200x630 share
// image. Resolves to null (not a thrown error) when the canvas can't be
// exported — e.g. a hero/logo image from a host that blocks CORS, which
// taints the canvas. Callers should treat null as "tell the user to
// upload their own share picture instead."
export async function generateShareImage(
  heroUrl: string,
  logoUrl: string,
  brandColour: string
): Promise<Blob | null> {
  const W = 1200, H = 630;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const rgb = hexToRgb(brandColour || '#1f5c3d');
  const brand = `rgba(${rgb.r},${rgb.g},${rgb.b},`;

  const hero = await loadImage(heroUrl).catch(() => null);
  if (hero) {
    drawCover(ctx, hero, W, H);
  } else {
    ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    ctx.fillRect(0, 0, W, H);
  }

  const wash = ctx.createLinearGradient(0, 0, W, H);
  wash.addColorStop(0, brand + '0.94)');
  wash.addColorStop(0.5, brand + '0.78)');
  wash.addColorStop(1, brand + '0.55)');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, W, H);

  const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.85);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.28)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  const logo = await loadImage(logoUrl).catch(() => null);
  const plate = 340, px = (W - plate) / 2, py = (H - plate) / 2;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, px, py, plate, plate, 28);
  ctx.fill();
  ctx.restore();

  if (logo) {
    const pad = 44, box = plate - pad * 2;
    const lr = logo.width / logo.height;
    let lw, lh;
    if (lr > 1) { lw = box; lh = box / lr; } else { lh = box; lw = box * lr; }
    ctx.drawImage(logo, px + (plate - lw) / 2, py + (plate - lh) / 2, lw, lh);
  }

  return new Promise((resolve) => {
    try {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    } catch {
      resolve(null);
    }
  });
}