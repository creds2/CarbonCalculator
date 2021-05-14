const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/map.html',
  '/la.html',
  '/data.html',
  '/about.html',
  '/datawarnings.html',
  '/css/main_carbon.css',
  '/css/map_ledgend.css',
  '/css/modal.css',
  '/css/welcome.css',
  '/fonts/fonts.json',
  "/js/accordion.js",
  "/js/ga_optout.js",
  "/js/get_json.js",
  "/js/la_report.js",
  "/js/layer_control.js",
  "/js/lib/mapbox-gl-js-1.13/mapbox-gl.js",
  "/js/lib/mapbox-gl-js-1.13/mapbox-gl.css",
  "/js/map_carbon.js",
  "/js/map_layerdesc.js",
  "/js/modal.js",
  "/js/modal_epc.js",
  "/js/modal_housing.js",
  "/js/modal_overview.js",
  "/js/modal_transport.js",
  "/js/welcome.js",
  "/data/la_averages.json",
  "/data/oac_averages.json",
  "/sprites/sprites.json",
  "/sprites/sprites.png",
  "/sprites/sprites@2x.json",
  "/sprites/sprites@2x.png",
  "/sprites/sprites@3x.json",
  "/sprites/sprites@3x.png"
  
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});


const dynamicCacheName = 'site-dynamic-v1';

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key =>  key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});
