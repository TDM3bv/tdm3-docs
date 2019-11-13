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
    "revision": "f772f7347003e1d6ff20e381a2bfe479"
  },
  {
    "url": "assets/css/0.styles.61f87b4f.css",
    "revision": "ff093efd62225635e8f05410e2749500"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.cdf21023.js",
    "revision": "ef1b2b18b29504991d6ca21c334ea9c9"
  },
  {
    "url": "assets/js/11.fb556b37.js",
    "revision": "25e2832911cdced5eec015a6b57ff114"
  },
  {
    "url": "assets/js/12.a4c0fccc.js",
    "revision": "4599e887e496bc32d77038fb001bb016"
  },
  {
    "url": "assets/js/13.9788617e.js",
    "revision": "28d312f57422d5425ea7f4b7de5b16d1"
  },
  {
    "url": "assets/js/14.dc7b189e.js",
    "revision": "f2f0145217e7372d9bb5f84fff0dcd43"
  },
  {
    "url": "assets/js/15.07c64812.js",
    "revision": "d6b96d69206211377a384d3630699e4e"
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
    "url": "assets/js/7.a3919dea.js",
    "revision": "6ab7bcff8a90e9db17e7c2eb8e79ff08"
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
    "url": "assets/js/app.1d57f736.js",
    "revision": "f57d228eb5c881b1668ce20f9f323c53"
  },
  {
    "url": "doctor/index.html",
    "revision": "a84b48073bbffb2f90f7f3c2ccad4803"
  },
  {
    "url": "index.html",
    "revision": "e1c87f9fede54f3bbbb71bfb8e6ab061"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "nurse/index.html",
    "revision": "3cf348e080cb953a959402e4fd91280a"
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
