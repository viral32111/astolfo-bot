import type { IRequest } from "itty-router"

export const extractRequestHeaders = (headers: Headers): Record<string, string> =>
	Object.fromEntries(
		Array.from(headers.entries())
			.map<[string, string]>(([name, value]) => [name.toLowerCase(), value])
			.toSorted(([a], [b]) => a.localeCompare(b))
	)

export const extractRequestParameters = (url: URL): Record<string, string> =>
	Object.fromEntries(
		Array.from(url.searchParams.entries())
			.map<[string, string]>(([name, value]) => [name.toLowerCase(), value])
			.toSorted(([a], [b]) => a.localeCompare(b))
	)

export const extractRequest = (
	request: IRequest
): {
	method: string
	url: {
		protocol: string
		hostname: string
		port: string
		pathname: string
		parameters: Record<string, string>
	}
	headers: Record<string, string>
} => {
	const url = new URL(request.url)

	return {
		method: request.method.toUpperCase(),
		url: {
			protocol: url.protocol.substring(0, url.protocol.length - 1),
			hostname: url.hostname,
			port: url.port,
			pathname: url.pathname,
			parameters: extractRequestParameters(url)
		},
		headers: extractRequestHeaders(request.headers)
	}
}
