import { ApplicationCommandType } from "discord-api-types/v10"
import type { IRequest } from "itty-router"

import { JsonResponse } from "~/classes/response"
import { Route } from "~/enumerations/route"
import type { RegisterRouteFunction } from "~/types/route"

// POST /discord/register
export const registerRegisterDiscordApplicationCommandsRoute: RegisterRouteFunction = (router, path = Route.RegisterDiscordApplicationCommands): void => {
	router.post<IRequest, [Env, { props: object }]>(path, async (_, env) => {
		const apiUrl = new URL(`${env.DISCORD_API_BASE_URL}/applications/${env.DISCORD_APPLICATION_ID}/commands`)

		const applicationCommand = {
			name: "astolfo",
			description: "🌸 Astolfo for your Discord server 🌸",
			type: ApplicationCommandType.ChatInput
			/*
			options: [
				{
					name: "rating",
					description: "The rating of the image.",
					type: ApplicationCommandOptionType.String,
					required: false,
					choices: [
						{ name: "🩷 Safe", value: "safe" },
						{ name: "🤷 Questionable", value: "questionable" },
						{ name: "🔞 Explicit", value: "explicit" },
						{ name: "❔ Unknown", value: "unknown" }
					]
				}
			]
			*/
		}

		const apiResponse = await fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bot ${env.DISCORD_APPLICATION_BOT_TOKEN}`,

				"User-Agent": "Astolfo Bot (+https://github.com/viral32111/astolfo-bot)",
				"From": "contact@viral32111.com",
				"X-Powered-By": "Cloudflare Workers"
			},
			body: JSON.stringify([applicationCommand])
		})

		if (!apiResponse.ok) throw new Error(`Received HTTP ${apiResponse.status.toString()} from '${apiUrl.toString()}'! (${await apiResponse.text()})`)

		return new JsonResponse({ status: 200, response: await apiResponse.json() })
	})
}
