import { InteractionResponseType, InteractionType, type APIInteractionResponse } from "discord-api-types/v10"
import type { IRequest } from "itty-router"

import { ErrorResponse, JsonResponse } from "~/classes/response"
import { Route } from "~/enumerations/route"
import { verifyDiscordInteraction } from "~/helpers/discord/interaction"
import type { RegisterRouteFunction } from "~/types/route"

// POST /discord/interaction
export const registerDiscordInteractionRoute: RegisterRouteFunction = (router, path = Route.DiscordInteraction): void => {
	router.post<IRequest, [Env, { props: object }]>(path, async (request, env) => {
		try {
			const interaction = await verifyDiscordInteraction(request, env)

			if (interaction.type === InteractionType.Ping)
				return new JsonResponse({
					type: InteractionResponseType.Pong
				} satisfies APIInteractionResponse)

			if (interaction.type !== InteractionType.ApplicationCommand)
				throw new Error(`Unsupported Discord interaction type '${interaction.type.toString()}'!`)

			const interactionName = interaction.data.name.toLowerCase()
			switch (interactionName) {
				case "astolfo": {
					return new JsonResponse({
						type: InteractionResponseType.ChannelMessageWithSource,
						data: {
							content: "Hello World!"
						}
					} satisfies APIInteractionResponse)
				}

				default:
					throw new Error(`Unknown Discord interaction (application command) name '${interactionName}'!`)
			}
		} catch (error: unknown) {
			return new ErrorResponse(error)
		}
	})
}
