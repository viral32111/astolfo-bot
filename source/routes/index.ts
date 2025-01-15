import type { IRequest } from "itty-router"

import { Route } from "~/enumerations/route"
import type { RegisterRouteFunction } from "~/types/route"

// GET /
export const registerRedirectRoute: RegisterRouteFunction = (router, path = Route.HelloWorld): void => {
	router.get<IRequest, [Env, { props: object }]>(
		path,
		(_, env): Response =>
			new Response(null, {
				status: 307,
				headers: {
					Location: `https://discord.com/oauth2/authorize?client_id=${env.DISCORD_APPLICATION_ID}`
				}
			})
	)
}
