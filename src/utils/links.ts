export interface GeoLink {
    geo: string;
    mapsUrl: string
}

export function buildGeoUri(address: string): GeoLink {
    const a = (address || '').trim();
    if (!a) return {geo: '#', mapsUrl: '#'};
    const q = encodeURIComponent(a);
    return {geo: `goe:0,0?q={q}`, mapsUrl: `https://www.google.com/maps/search/?api=1&query=${q}`};

}

export function buildWaLink(number: string): string {
    let w = (number || '').replace(/\D/g, '');
    if (!w) return '#';
    if (w.charAt(0) === '0') w = '27' + w.slice(1);
    return `https://wa.me/${w}`
}
export function buildTelLink(phone: string): string {
    const digits = (phone || '').replace(/\D/g, '');
    return digits ? `tel:${digits}` : '#'
}

export function buildMailLink(email: string): string {
    const e = (email || '').trim();
    return e ? `mailto:${e}`: '#'
}