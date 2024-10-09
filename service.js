/*
-)  Service Workers
    -) A Service Worker is a script (written in JavaScript) that runs in the background, separate from the web page, enabling functionalities such as
       -) Background sync
       -) Push notifications
       -) Offline caching of assets and data for Progressive Web Apps (PWA)
       -) Unlike traditional web scripts, Service Workers can intercept network requests, enabling developers to
          provide seamless experiences even when a user is offline or has a poor network connection.

    -) Key Concepts:
       -) Runs in the background: A Service Worker operates separately from the main browser thread, running in a worker context,
                                  which means it has no direct access to the DOM.
       -) Intercepts network requests: It can intercept and handle requests to provide offline functionality by caching assets
                                       or serving cached versions of pages when the network is unavailable.
       -) Lifecycle: A Service Worker has a well-defined lifecycle, consisting of:
          -) Installation: When the service worker is first registered, it's downloaded, installed, and can cache resources,often used to pre-cache resources
                                            self.addEventListener('install', (event) => {
                                                event.waitUntil(
                                                    caches.open('v1').then((cache) => {
                                                        return cache.addAll(['/index.html', '/styles.css', '/app.js']);
                                                    })
                                                );
                                            });   

          -) Activation: After installation, the service worker is activated and can control pages, is used to clean up old caches or migrate data
                                            self.addEventListener('activate', (event) => {
                                                // Clean up outdated caches
                                            });

          -) Fetch and Message Events: The service worker listens for network requests (fetch events) and communication between
             the main thread and worker thread (message events). Intercept network requests to provide cached content or make network requests
                                             self.addEventListener('fetch', (event) => {
                                                event.respondWith(
                                                    caches.match(event.request).then((response) => {
                                                        return response || fetch(event.request);
                                                    })
                                                );
                                            });

*/

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll(['/index.html', '/styles.css', '/app.js']);
        })
    );
});
