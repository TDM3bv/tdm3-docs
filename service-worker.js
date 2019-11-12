/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "76a1674272cbd469eb767d0311a33e5b"
  },
  {
    "url": "assets/css/0.styles.fe9ff009.css",
    "revision": "226b300460426eb38277a1f4ba9a408e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.8efd55c8.js",
    "revision": "e683fa1246613d7a3daba286c8233e6c"
  },
  {
    "url": "assets/js/11.53ca78e1.js",
    "revision": "ad9643c237a902367b7e69a2e74f217e"
  },
  {
    "url": "assets/js/12.d09a4a0d.js",
    "revision": "41750474aa183a2edc988a62dea1bb70"
  },
  {
    "url": "assets/js/13.9db6bda4.js",
    "revision": "942a666e114383fa259423457d179d1a"
  },
  {
    "url": "assets/js/14.dae1c884.js",
    "revision": "9f3ee492bc63dce38f11aceb6a621f35"
  },
  {
    "url": "assets/js/15.ed053d09.js",
    "revision": "cd3ce94a837cca8df0860ed00f2a8287"
  },
  {
    "url": "assets/js/16.6f01f830.js",
    "revision": "0b747f80483a323f4fab7c5c8d2793d0"
  },
  {
    "url": "assets/js/17.2e81d5f9.js",
    "revision": "bc565aeecec35cd43e3060bde3e6a3f4"
  },
  {
    "url": "assets/js/2.ee9d2073.js",
    "revision": "58fe29b662e8e7dc4cb79757f9126a11"
  },
  {
    "url": "assets/js/3.5813f2b0.js",
    "revision": "5102cbf4116d73635ea6138cdbac7b6e"
  },
  {
    "url": "assets/js/4.2382e639.js",
    "revision": "0c4bc3548dfa809ca956497b1e1ffcbd"
  },
  {
    "url": "assets/js/5.95a5fd5a.js",
    "revision": "0a57f12b92e9b5f1e811b2049bc60631"
  },
  {
    "url": "assets/js/6.63f9604b.js",
    "revision": "195470495778be5a50417fa0de830560"
  },
  {
    "url": "assets/js/7.4ec88eec.js",
    "revision": "8950604aaddfe0fedd3bcfd8e87232c4"
  },
  {
    "url": "assets/js/8.5b6d50b1.js",
    "revision": "9f6d73ed5116376bb2bec9d7f9be9939"
  },
  {
    "url": "assets/js/9.a837625c.js",
    "revision": "8a1feb0da80c874ccb402cc9a1092ff6"
  },
  {
    "url": "assets/js/app.90cd1e85.js",
    "revision": "2c19da26b3c6b2a2ba7e06c77e6c1126"
  },
  {
    "url": "index.html",
    "revision": "61b22b94c2956ed09bd8c736ca90cebd"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "nurse/batch_xml.html",
    "revision": "0297b3328be041606cc9ee44ca32f1f2"
  },
  {
    "url": "nurse/index.html",
    "revision": "5ca3cec150bf48370a3f75df65ae8039"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
