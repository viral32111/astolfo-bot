import { InteractionResponseType, type APIApplicationCommandInteraction, type APIInteractionResponse } from "discord-api-types/v10"
import type { IRequest } from "itty-router"
import type { AstolfoRocksAPIResponse } from "~/types/astolfo-rocks"

export const handleAstolfoApplicationCommand = async (_: APIApplicationCommandInteraction, __: IRequest, env: Env): Promise<APIInteractionResponse> => {
	// console.info(JSON.stringify((interaction as APIChatInputApplicationCommandInteraction).data.options))

	const apiUrl = new URL(`${env.ASTOLFO_ROCKS_API_BASE_URL}/images/random`)

	const apiResponse = await fetch(apiUrl, {
		headers: {
			"User-Agent": "Astolfo Bot (+https://github.com/viral32111/astolfo-bot)",
			"From": "contact@viral32111.com",
			"X-Powered-By": "Cloudflare Workers"
		}
	})

	if (!apiResponse.ok) throw new Error(`Received HTTP ${apiResponse.status.toString()} from '${apiUrl.toString()}'! (${await apiResponse.text()})`)

	const { id, rating, file_extension, width, height, file_size, source } = await apiResponse.json<AstolfoRocksAPIResponse>()

	return {
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: `<https://astolfo.rocks/astolfo/${id.toString()}.${file_extension}>`,
			embeds: [
				{
					title: id.toString(),
					description: `${rating.substring(0, 1).toUpperCase()}${rating.substring(1)} | ${width.toString()}x${height.toString()} | ${(file_size / 1024).toFixed(2)} KiB`,
					color: 0xffc0cb, // Pink
					author: {
						name: source,
						url: source
					},
					image: {
						url: `https://astolfo.rocks/astolfo/${id.toString()}.${file_extension}`
					},
					footer: {
						text: "astolfo.rocks",
						icon_url: "https://astolfo.rocks/img/favicon/android-icon-192x192.png"
					}
				}
			]
		}
	}
}
