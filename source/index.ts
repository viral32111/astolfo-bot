import { AutoRouter } from "itty-router"

import { ErrorResponse, JsonResponse } from "~/classes/response"
import { extractRequest } from "~/helpers/request"
import { registerIndexRoute } from "~/routes"
import { registerHandleDiscordInteractionRoute } from "~/routes/discord/interaction"
import { registerRegisterDiscordApplicationCommandsRoute } from "./routes/discord/register"

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

registerIndexRoute(router) // GET /
registerHandleDiscordInteractionRoute(router) // POST /discord/interaction
registerRegisterDiscordApplicationCommandsRoute(router) // POST /discord/register

// Catch-all
router.all(
	"*",
	request =>
		new JsonResponse(
			{
				status: 404,
				error: {
					request: extractRequest(request)
				}
			},
			{
				status: 404
			}
		)
)

export default { fetch: router.fetch } satisfies ExportedHandler<Env>
