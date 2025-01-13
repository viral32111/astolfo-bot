import { parse } from "stacktrace-parser"

export class JsonResponse extends Response {
	public constructor(body: object, init: ResponseInit = {}) {
		const json = JSON.stringify(body)

		init.status ??= 200

		init.headers = {
			// eslint-disable-next-line @typescript-eslint/no-misused-spread
			...(init.headers ?? {}),
			"content-type": "application/json"
		}

		super(json, init)
	}
}

export class ErrorResponse extends Response {
	public constructor(error: unknown, init: ResponseInit = {}) {
		init.status ??= 500

		const json = JSON.stringify({
			status: init.status,
			error:
				error instanceof Error
					? {
							name: error.name,
							message: error.message,
							stack: error.stack !== undefined ? parse(error.stack) : null,
							cause: error.cause ?? null
						}
					: { error }
		})

		init.headers = {
			// eslint-disable-next-line @typescript-eslint/no-misused-spread
			...(init.headers ?? {}),
			"content-type": "application/json"
		}

		console.error(`HTTP ${init.status.toString()}: ${json}`)

		super(json, init)
	}
}
