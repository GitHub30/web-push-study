importScripts('https://unpkg.com/@gauntface/logger@3.0.13/build/browser-globals.js')

logger.setPrefix('web-push-study/service worker')

self.addEventListener('install', () => {
	self.skipWaiting()
})

self.addEventListener('push', function (event) {
	logger.log('Push message received.')
	const data = {
		...{
			title: 'Hello',
			body: 'Thanks for sending this push msg.',
			icon: 'https://simple-push-demo.vercel.app/images/logo-192x192.png',
			badge: 'https://simple-push-demo.vercel.app/images/badge-72x72.png',
			tag: 'web-push-study-notification',
			data: {
				url: 'https://web.dev/push-notifications-overview/',
			},
		}, ...event.data.json()
	}
	console.log(data)

	event.waitUntil(
		self.registration.showNotification(data.title, data),
	)
})

self.addEventListener('notificationclick', function (event) {
	logger.log('Notification clicked.')
	event.notification.close()

	let clickResponsePromise = Promise.resolve()
	if (event.notification.data && event.notification.data.url) {
		clickResponsePromise = clients.openWindow(event.notification.data.url)
	}

	event.waitUntil(clickResponsePromise)
})
