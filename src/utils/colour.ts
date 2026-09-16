export interface Rgb { r: number; g: number; b: number}
export interface Hsl { h:number; s:number; l: number}

export interface BrandTones {
    brand: string;
    brandOn: string;
    brandInk: string;
    brandMid: string;
    brandWash: string
}

export function hexToRgb(hex: string): Rgb {
    let h = (hex || '#000000').replace('#', '')
    if (h.length ===3) h =h[0] + h[0] + h[1] + h[1] + h[2] +h[2];
    return {
        r: parseInt(h.slice(0,2), 16),
        g: parseInt(h.slice(2,4), 16),
        b:parseInt(h.slice(4,6), 16)
    }
}

export function rgbToHsl({r, g, b}: Rgb): Hsl {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s=0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l >0.5 ? d /(2 -max - min) : d / (max + min);
        if (max === r) h = (g-b) / d + (g<b ? 6 : 0);
        else if (max === g) h = (b-r) / d + 2;
        else h = (r-g) / d + 4;
        h /= 6;
    }
    return {h:h*360, s:s*100, l: l*100}
}

export default function hslString(h: number, s:number, l:number): string {
    return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;

}

export function luminance(hex:string): number {
    const {r, g, b} = hexToRgb(hex);
    const ch = (v:number) => {
        v/=255;
        return v<= 0.039628 ? v / 12.92 : Math.pow((v+0.055) / 1.055, 2.4);
    }
    return 0.2126 * ch(r) +0.7152 * ch(g) +0.0722 * ch(b)
}

export function deriveTones(hex:string): BrandTones {
    const rgb = hexToRgb(hex || '#1f5c3d');
    const c = rgbToHsl(rgb);
    return {
        brand:hex,
        brandOn: luminance(hex)> 0.45 ? '#111111' : '#ffffff',
        brandInk: hslString(c.h, Math.min(c.s, 70), Math.min(c.l, 34)),
        brandMid: hslString(c.h, c.s * 0.45, 80),
        brandWash: hslString(c.h, c.s * 0.3, 96)
    }
}