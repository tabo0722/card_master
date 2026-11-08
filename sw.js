// カードマスター：オフラインで開けるようにする最小限のサービスワーカー。
// 画面のHTMLは、つながるときは常にネットから取って保存し直し、つながらないときだけ保存したものを使う（更新が遅れない）。
// HTMLの名前は index.html でも card-master.html でもよい（どちらで置いても動く）。
// 版を上げるときは V の数字を変える（古い保存は自動で消える）。
const V='cardmaster-v1.84';
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
const PAGES=['./','./index.html','./card-master.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all([c.addAll(ASSETS).catch(()=>{}),...PAGES.map(p=>c.add(p).catch(()=>{}))])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 const key=new Request(u.origin+u.pathname);
 const page=r.mode==='navigate'||/\.html?$/.test(u.pathname)||u.pathname.endsWith('/');
 if(page){e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(key,cp))}return res}).catch(()=>caches.match(key).then(m=>m||caches.match('./index.html')).then(m=>m||caches.match('./')).then(m=>m||caches.match('./card-master.html'))));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})))});
