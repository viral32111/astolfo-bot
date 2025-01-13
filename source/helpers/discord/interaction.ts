import { verifyKey } from "discord-interactions"
import type { IRequest } from "itty-router"

import { DiscordHeader } from "~/enumerations/discord/header"
import type { AnyDiscordInteraction } from "~/types/discord/interaction"

export const verifyDiscordInteraction = async (request: IRequest, env: Env): Promise<AnyDiscordInteraction> => {
	const signature = request.headers.get(DiscordHeader.X_SIGNATURE_ED25519)
	if (signature === null) throw new Error(`Missing HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}'!`)
	if (signature.length <= 0) throw new Error(`Empty HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}' value!`)
	if (signature.length !== 128)
		throw new Error(
			`Incorrect HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}' value '${signature}' length! (expected 64, got ${signature.length.toString()})`
		)

	const timestamp = request.headers.get(DiscordHeader.X_SIGNATURE_TIMESTAMP)
	if (timestamp === null) throw new Error(`Missing HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}'!`)
	if (timestamp.length <= 0) throw new Error(`Empty HTTP request header '${DiscordHeader.X_SIGNATURE_TIMESTAMP}' value!`)
	if (isNaN(parseInt(timestamp, 10)))
		throw new Error(`Unable to parse HTTP request header '${DiscordHeader.X_SIGNATURE_TIMESTAMP}' value '${timestamp}' as number!`)

	const text = await request.text()
	if (text.length <= 0) throw new Error("Empty HTTP request body!")

	if (!(await verifyKey(text, signature, timestamp, env.DISCORD_APPLICATION_INTERACTIONS_PUBLIC_KEY)))
		throw new Error(
			`Incorrect Discord interaction signature '${signature}' & timestamp '${timestamp}' for body '${text}' using public key '${env.DISCORD_APPLICATION_INTERACTIONS_PUBLIC_KEY}'!`
		)

	return JSON.parse(text) as AnyDiscordInteraction
}
