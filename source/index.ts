import { AutoRouter, type IRequest } from "itty-router"

import { ErrorResponse, JsonResponse } from "~/classes/response"
import { extractRequest } from "~/helpers/request"
import { registerRedirectRoute } from "~/routes"
import { registerHandleDiscordInteractionRoute } from "~/routes/discord/interaction"
import { registerRegisterDiscordApplicationCommandsRoute } from "./routes/discord/register"

const SECRET_NAMES = ["DISCORD_APPLICATION_BOT_TOKEN", "DISCORD_APPLICATION_OAUTH2_SECRET"]

// eslint-disable-next-line new-cap
export const router = AutoRouter({
	catch: (error: unknown) => new ErrorResponse(error),
	finally: [
		(response: Response) => {
			response.headers.set("From", "contact@viral32111.com")
			response.headers.set("X-Powered-By", "Cloudflare Workers")
			response.headers.set("X-GitHub-URL", "https://github.com/viral32111/astolfo-bot")
		}
	]
})

registerRedirectRoute(router) // GET /
registerHandleDiscordInteractionRoute(router) // POST /discord/interaction
registerRegisterDiscordApplicationCommandsRoute(router) // POST /discord/register

// Catch-all
router.all<IRequest, [Env, { props: object }]>("*", (request, env, context): Response => {
	const environmentVariables = Object.fromEntries(
		Object.entries(env)
			.map<[string, string]>(([name, value]: [string, string]) => {
				const _name = name.toUpperCase()
				if (SECRET_NAMES.includes(name)) return [_name, "*".repeat(Math.floor(Math.random() * 11) + 15)]
				return [name.toUpperCase(), value]
			})
			.toSorted(([a], [b]) => a.localeCompare(b))
	)

	return new JsonResponse(
		{
			status: 404,
			debug: {
				request: extractRequest(request),
				env: environmentVariables,
				context
			}
		},
		{
			status: 404
		}
	)
})

export default { fetch: router.fetch } satisfies ExportedHandler<Env>
