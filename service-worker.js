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
    "revision": "bb1db22304174d08517d7ee1f093aac3"
  },
  {
    "url": "assets/css/0.styles.ac15293d.css",
    "revision": "ef0a42ee6abdf086703c988bec43ff69"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.fae33810.js",
    "revision": "4b0579e8b94e6127fd514d14d08472d3"
  },
  {
    "url": "assets/js/11.1edaec78.js",
    "revision": "7abe6f01860b47323fc2b6efdf0be798"
  },
  {
    "url": "assets/js/12.d0a58eb1.js",
    "revision": "3c917e940efa0c4ef3584ccbc2216a4a"
  },
  {
    "url": "assets/js/13.ed2af69a.js",
    "revision": "d04e491b2fc4cd9f5658f496455e34d1"
  },
  {
    "url": "assets/js/14.38db3ef3.js",
    "revision": "c38b34bc213759c1209f57eb33d3fc3b"
  },
  {
    "url": "assets/js/15.7be21cdf.js",
    "revision": "28de24b36eb5bb4a4f826184f2c8d4d1"
  },
  {
    "url": "assets/js/16.d373ba9a.js",
    "revision": "4f4d04c8d59213d64a7cc4fbc5791097"
  },
  {
    "url": "assets/js/17.0a085ca8.js",
    "revision": "013a20f9021fbe7be8319553abf1fce7"
  },
  {
    "url": "assets/js/18.68464975.js",
    "revision": "70658194d597427ce88659f0c26a82cf"
  },
  {
    "url": "assets/js/3.d0406f5b.js",
    "revision": "19cb25c186e9b7a135f7741b04fedec1"
  },
  {
    "url": "assets/js/4.b9c76b12.js",
    "revision": "eb57fce676ec55026a5cb17a0a513a8a"
  },
  {
    "url": "assets/js/5.cb95fee3.js",
    "revision": "b441e457aeefc86bd447200025f72a6f"
  },
  {
    "url": "assets/js/6.8214b042.js",
    "revision": "ede43cb8d4578fbead8c65832013c9a7"
  },
  {
    "url": "assets/js/7.b0ba4e6a.js",
    "revision": "2543ba815b51a004fb402d15dadf128e"
  },
  {
    "url": "assets/js/8.86d955ef.js",
    "revision": "365e22705eb1a25cdcaea03860286270"
  },
  {
    "url": "assets/js/9.b88e2e17.js",
    "revision": "aced7fe6d0bb940e9693164982891432"
  },
  {
    "url": "assets/js/app.096aca45.js",
    "revision": "9ce15dd263d6446792ba50d6e5fc17c4"
  },
  {
    "url": "assets/js/vendors~docsearch.97920b74.js",
    "revision": "84ed888f901917d71079c9855e8eb431"
  },
  {
    "url": "doctor/index.html",
    "revision": "65cfa13a99f56b27f8efd7a85b575163"
  },
  {
    "url": "index.html",
    "revision": "e91b7e9890e6e131727982e121852279"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "nurse/index.html",
    "revision": "81d721450ee34d04c11b608c35316307"
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
