var C='mguide-v2';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll([self.registration.scope]).then(function(){return c.add(self.registration.scope+'index.html').catch(function(){})})}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf('mguide-')===0&&k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.mode!=='navigate'&&!e.request.url.match(/\.html(\?|$)/))return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
    var net=fetch(e.request).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return res}).catch(function(){return hit});
    return hit||net;
  }))
});