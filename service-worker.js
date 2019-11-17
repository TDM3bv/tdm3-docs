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
    "revision": "3450c01e320407eee4cb4ab0637f7bed"
  },
  {
    "url": "assets/css/0.styles.3ad29552.css",
    "revision": "4ece48c039a323f81fd0ca8e3ffbded6"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d0ae1eef.js",
    "revision": "4c55d4c4367d5d1243f3d54c613e129e"
  },
  {
    "url": "assets/js/11.bc96a656.js",
    "revision": "a37615126401a0a3405db7f3fbab77bc"
  },
  {
    "url": "assets/js/12.a4c0fccc.js",
    "revision": "4599e887e496bc32d77038fb001bb016"
  },
  {
    "url": "assets/js/13.cd86faa0.js",
    "revision": "279526f568a7a4f5037ba829fd0532cd"
  },
  {
    "url": "assets/js/14.6287e235.js",
    "revision": "8490aed5070e3096d6ff5f1289911416"
  },
  {
    "url": "assets/js/15.aa741cf5.js",
    "revision": "07565abe4a9207001f12d021894f6538"
  },
  {
    "url": "assets/js/16.da30d705.js",
    "revision": "cfcbff449447939222718cefafb9aa19"
  },
  {
    "url": "assets/js/17.56026aab.js",
    "revision": "c664c3e1c313bbb7cdb370bb0b944799"
  },
  {
    "url": "assets/js/2.fba5b92c.js",
    "revision": "493df2f59e29251b3628aa650ce65dce"
  },
  {
    "url": "assets/js/3.1ddeaa31.js",
    "revision": "b740803b6fcd03c4c40e10df36b05fd5"
  },
  {
    "url": "assets/js/4.7ad1f976.js",
    "revision": "54272d6721eaf8005d071d5b229b406a"
  },
  {
    "url": "assets/js/5.a112ff7d.js",
    "revision": "3b875954addab2b65cc1d5302f23172a"
  },
  {
    "url": "assets/js/6.79af4e15.js",
    "revision": "6b7304abed11fff3058f9fef18cdcc7e"
  },
  {
    "url": "assets/js/7.f69522b8.js",
    "revision": "b8a18d72489ddd9106af6cb208eca41d"
  },
  {
    "url": "assets/js/8.167da67d.js",
    "revision": "09e5db2bdfaea7b6c1197c62eadb8ef3"
  },
  {
    "url": "assets/js/9.d1ab2cad.js",
    "revision": "14f54268959f4ac813cffc6c81fe8efe"
  },
  {
    "url": "assets/js/app.b5f62823.js",
    "revision": "d689ab800525d4e5cf3bad20e26e6091"
  },
  {
    "url": "doctor/index.html",
    "revision": "8321f14a6edc1283596454f69b1bc6d8"
  },
  {
    "url": "index.html",
    "revision": "55429e96fc0008ea2ce5a9e8e1e42fc2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "nurse/index.html",
    "revision": "0465ceb37b70ade1de2c2229082d8e97"
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
