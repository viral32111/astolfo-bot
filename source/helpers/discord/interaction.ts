import { verifyKey } from "discord-interactions"
import type { IRequest } from "itty-router"

import { DiscordHeader } from "~/enumerations/discord/header"
import type { AnyDiscordInteraction } from "~/types/discord/interaction"

export const verifyDiscordInteraction = async (request: IRequest, { DISCORD_APPLICATION_INTERACTIONS_PUBLIC_KEY }: Env): Promise<AnyDiscordInteraction> => {
	const signature = request.headers.get(DiscordHeader.X_SIGNATURE_ED25519)
	if (signature === null) throw new Error(`Missing HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}'!`)
	if (signature.length <= 0) throw new Error(`Empty HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}'!`)
	if (signature.length !== 64)
		throw new Error(
			`Invalid HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}' (${signature}) length! (expected 64, got ${signature.length.toString()})`
		)

	const timestamp = request.headers.get(DiscordHeader.X_SIGNATURE_TIMESTAMP)
	if (timestamp === null) throw new Error(`Missing HTTP request header '${DiscordHeader.X_SIGNATURE_ED25519}'!`)
	if (timestamp.length <= 0) throw new Error(`Empty HTTP request header '${DiscordHeader.X_SIGNATURE_TIMESTAMP}'!`)

	const body = await request.text()
	if (body.length <= 0) throw new Error("Empty HTTP request body!")

	await verifyKey(body, signature, timestamp, DISCORD_APPLICATION_INTERACTIONS_PUBLIC_KEY)

	return JSON.parse(body) as AnyDiscordInteraction
}
