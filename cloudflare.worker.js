const appleApp = {
  "applinks": {
    "details": [
      {
        "appIDs": ["JZUX7Z6U42.org.reactjs.native.JZUX7Z6U42.Fabi"],
        "components": [
          {
            "/": "/auth/email-verification",
            "?": { "hash": "*" },
            "comment": "Matches URL whose path equals /Auth/EmailVerification and which has a query item with name 'hash'"
          }
        ]
      }
    ]
  }
}

const androidApp = [{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "Fabi",
    "package_name": "com.fabi",
    "sha256_cert_fingerprints": [
      // debug.keystore
      "FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C",
      // development.keystore
      "C6:8A:63:30:A4:12:06:76:94:43:E2:97:4B:14:78:F1:10:F2:90:6B:37:13:DC:45:3E:83:97:40:2E:6A:09:2C"
    ]
  }
}]

const pathRegexp = /https?:\/\/(.*\.dev)(.*)/

/**
 * Respond to the request
 * @param {Request} request
 */
async function route(request) {
  const path = pathRegexp.exec(request.url)
  if (path.length < 3) return new Response(null, { status: 404 })

  switch (path[2]) {
    case '/.well-known/apple-app-site-association':
      return new Response(JSON.stringify(appleApp), { status: 200, headers: { "content-type": "application/json" } })
    case '/.well-known/assetlinks.json':
      return new Response(JSON.stringify(androidApp), { status: 200, headers: { "content-type": "application/json" } })
    default:
      return redirectToStore(request.headers)
  }
}

function redirectToStore(headers) {
  const isSafari = (headers.get('user-agent') || '').indexOf('Safari') !== -1
  const location = isSafari ? 'https://apps.apple.com/us/app/su-yao/id1166499145' : 'https://play.google.com/store'

  return new Response(null, { status: 302, headers: { "Location": location } })
}

addEventListener('fetch', event => {
  route(event.request)
  event.respondWith(route(event.request))
})
