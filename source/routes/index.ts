import type { IRequest } from "itty-router"

import { JsonResponse } from "~/classes/response"
import { Route } from "~/enumerations/route"
import { extractRequest } from "~/helpers/request"
import type { RegisterRouteFunction } from "~/types/route"

const SECRET_NAMES = ["DISCORD_APPLICATION_BOT_TOKEN", "DISCORD_APPLICATION_OAUTH2_SECRET"]

// GET /
export const registerIndexRoute: RegisterRouteFunction = (router, path = Route.Index): void => {
	router.get<IRequest, [Env, { props: object }]>(path, (request, env, context): Response => {
		const environmentVariables = Object.fromEntries(
			Object.entries(env)
				.map<[string, string]>(([name, value]: [string, string]) => {
					const _name = name.toUpperCase()

					if (SECRET_NAMES.includes(name)) return [_name, "*".repeat(Math.floor(Math.random() * 11) + 15)]

					return [name.toUpperCase(), value]
				})
				.toSorted(([a], [b]) => a.localeCompare(b))
		)

		return new JsonResponse({
			request: extractRequest(request),
			env: environmentVariables,
			context
		})
	})
}
