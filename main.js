addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { method, url, headers } = request
  const parsedURL = url.replace(new URL(url).origin, '')
  const body = await request.text()

  let headersText = ''

  for (const [key, value] of new Map(headers)) {
    headersText += `\n${key}: ${value}`
  }

  const response =
    `${method} ${parsedURL} HTTP/1.1${headersText}\n\n${body}`

  return new Response(response)
}
