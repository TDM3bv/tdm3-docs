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
    "revision": "4671cb4cc2356e89e56ca171c9dc25a3"
  },
  {
    "url": "assets/css/0.styles.c123c3b5.css",
    "revision": "4009d797e9e85e385b2a67692677bdf6"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.be377ec5.js",
    "revision": "d03792706295b36994b6d68cd9ef838d"
  },
  {
    "url": "assets/js/11.fb556b37.js",
    "revision": "25e2832911cdced5eec015a6b57ff114"
  },
  {
    "url": "assets/js/12.05470b38.js",
    "revision": "5b2f5da23ae3356150863dc8f3e008ed"
  },
  {
    "url": "assets/js/13.a9046c98.js",
    "revision": "97a517816165ffb285b2dd56e0da02f9"
  },
  {
    "url": "assets/js/14.1ec4d970.js",
    "revision": "7e0ad72856898f4f99c09f26fb0e1667"
  },
  {
    "url": "assets/js/15.ee64f135.js",
    "revision": "47049b5a6fca8d3eacb3dd3c595d9418"
  },
  {
    "url": "assets/js/16.20f848ce.js",
    "revision": "38ed424ecf1d847f14ca1ca7da387c95"
  },
  {
    "url": "assets/js/17.1d2d91d0.js",
    "revision": "6edb9d0cb2ea97fd79b276deb3ffc6c7"
  },
  {
    "url": "assets/js/2.f57aa6d1.js",
    "revision": "9e3a1752d566b27e075c6a3daca94e48"
  },
  {
    "url": "assets/js/3.eb48f353.js",
    "revision": "804a105de337b8b9298d884ebac77aa3"
  },
  {
    "url": "assets/js/4.931f3b8a.js",
    "revision": "75fc7357bff34d454eba1d8e9f9c9499"
  },
  {
    "url": "assets/js/5.7fd64b4d.js",
    "revision": "2f0ff54e64a4bf0cbd4b7654dc43a91e"
  },
  {
    "url": "assets/js/6.deedcd93.js",
    "revision": "63d5c6cbcabbc29c285c928b7aabc412"
  },
  {
    "url": "assets/js/7.3ee38685.js",
    "revision": "242720d0646d64f9652da65ca9b46e38"
  },
  {
    "url": "assets/js/8.a9508115.js",
    "revision": "0963ebf79590c8d73a46fab7d03652ed"
  },
  {
    "url": "assets/js/9.51019b9d.js",
    "revision": "872d4667820f1cf67faeee4a15fa2305"
  },
  {
    "url": "assets/js/app.cd748d33.js",
    "revision": "2b9e060cca224e2b73acddcb2b78151d"
  },
  {
    "url": "doctor/index.html",
    "revision": "77dbe909cbfd22be2814994925aa5943"
  },
  {
    "url": "index.html",
    "revision": "c481a872860fcf8f8f34f995330ea57b"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "nurse/index.html",
    "revision": "6adfad560fa25041f8460c876fb27b0b"
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
