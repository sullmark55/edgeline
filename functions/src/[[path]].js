// Cloudflare Pages: keep the board's source files under /src private (Netlify does this with _redirects).
export function onRequest(){ return new Response("Not found", {status:404, headers:{"content-type":"text/plain"}}); }
