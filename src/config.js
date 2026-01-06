// src/config.js

export const TMDB_API_KEY = '4eea503176528574efd91847b7a302cc'; 
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';
export const PLACEHOLDER_IMG = '/logo.png';

// Specific sandbox policies from your script
export const PROVIDER_SANDBOX_POLICY = {
    'vidsrc.to': "allow-scripts allow-same-origin allow-presentation allow-forms allow-pointer-lock",
    'vidsrc.me': "allow-scripts allow-same-origin allow-presentation allow-forms",
    'vidlink.pro': "allow-scripts allow-same-origin allow-presentation allow-forms allow-pointer-lock allow-orientation-lock",
    'superembed.stream': "allow-scripts allow-same-origin allow-presentation",
    '2embed.cc': "allow-scripts allow-same-origin allow-forms",
    'vidsrc.cc': "allow-scripts allow-same-origin allow-presentation allow-forms",
    'vidsrc.xyz': "allow-scripts allow-same-origin allow-presentation",
    'vidsrc.vip': "allow-scripts allow-same-origin allow-presentation allow-forms",
    'vidsrc.net': "allow-scripts allow-same-origin allow-presentation allow-forms",
    'net20.cc': "allow-scripts allow-same-origin allow-forms allow-presentation"
};

export const SERVERS = [
    { name: "VidSrc.to", domain: 'vidsrc.to', getUrl: (type, id, s, e) => `https://vidsrc.to/embed/${type}/${id}${type==='tv'?`/${s}/${e}`:''}` },
    { name: "VidSrc.me", domain: 'vidsrc.me', getUrl: (type, id, s, e) => type==='tv' ? `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.me/embed/movie?tmdb=${id}` },
    { name: "VidLink", domain: 'vidlink.pro', getUrl: (type, id, s, e) => type==='tv' ? `https://vidlink.pro/tv/${id}/${s}/${e}` : `https://vidlink.pro/movie/${id}` },
    { name: "SuperEmbed", domain: 'superembed.stream', getUrl: (type, id, s, e) => type==='tv' ? `https://superembed.stream/tv/${id}/${s}/${e}` : `https://superembed.stream/movie/${id}` },
    { name: "2Embed", domain: '2embed.cc', getUrl: (type, id) => `https://www.2embed.cc/embed/${id}` },
    { name: "VidSrc.cc", domain: 'vidsrc.cc', getUrl: (type, id, s, e) => type==='tv' ? `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}` : `https://vidsrc.cc/v2/embed/movie/${id}` },
];
