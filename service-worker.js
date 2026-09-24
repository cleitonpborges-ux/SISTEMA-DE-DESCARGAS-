const CACHE_NAME = 'sistema-descargas-v29'; // <-- Sempre que atualizar o index.html, mude esse número (v29, v30...) para forçar a atualização em todos os aparelhos.
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700;800&family=IBM+Plex+Sans:wght@300;400;600;700&display=swap'
];

// Instalação: salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        console.warn('Alguns assets não puderam ser cacheados:', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativação: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch:
// - Para o "casco" do app (navegação / index.html): tenta a rede primeiro, pra sempre
//   pegar a versão mais atual quando há internet; se falhar (offline), usa o cache.
//   Isso evita o problema de ficar preso numa versão antiga do index.html.
// - Para os demais arquivos (libs, fontes, ícones): cache primeiro, com atualização
//   em segundo plano quando disponível na rede (mantém o app rápido e funcionando offline).
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const ehCascoDoApp = event.request.mode === 'navigate' ||
                        url.pathname.endsWith('/index.html') ||
                        url.pathname === self.registration.scope.replace(self.location.origin, '') ||
                        url.href === self.registration.scope;

  if (ehCascoDoApp) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
