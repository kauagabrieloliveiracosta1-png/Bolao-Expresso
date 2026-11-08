// Bolão Expresso — service worker sem cache de HTML/JavaScript.
// Mantém as atualizações do GitHub Pages disponíveis também com Ctrl+R.
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
// Sem listener de fetch: o navegador busca sempre os arquivos atuais na rede.
