import { AutoRouter } from "itty-router"

import { ErrorResponse, JsonResponse } from "~/classes/response"
import { extractRequest } from "~/helpers/request"
import { registerIndexRoute } from "~/routes"
import { registerDiscordInteractionRoute } from "~/routes/discord/interaction"

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
registerDiscordInteractionRoute(router) // POST /discord/interaction

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
