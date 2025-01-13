// eslint-disable-next-line @typescript-eslint/require-await
const fetch: ExportedHandlerFetchHandler<Env> = async (request, env, context): Promise<Response> => {
	console.info("Hello Worker!")

	const requestUrl = new URL(request.url)
	const requestHeaders = Object.fromEntries(Array.from(request.headers.entries()).map(([key, value]) => [key.toLowerCase(), value]))
	const requestParameters = Object.fromEntries(Array.from(requestUrl.searchParams.entries()).map(([key, value]) => [key.toLowerCase(), value]))

	return new Response(
		JSON.stringify({
			request: {
				method: request.method.toUpperCase(),
				url: {
					schema: requestUrl.protocol.substring(0, requestUrl.protocol.length - 1),
					host: requestUrl.hostname,
					port: requestUrl.port,
					path: requestUrl.pathname,
					parameters: requestParameters
				},
				headers: requestHeaders
			},
			env,
			context
		}),
		{
			status: 200,
			headers: {
				"content-type": "application/json"
			}
		}
	)
}

export default { fetch } satisfies ExportedHandler<Env>
