import type {
	APIApplicationCommandAutocompleteInteraction,
	APIApplicationCommandInteraction,
	APIMessageComponentInteraction,
	APIModalSubmitInteraction,
	APIPingInteraction
} from "discord-api-types/v10"

export type AnyDiscordInteraction =
	| APIApplicationCommandAutocompleteInteraction
	| APIApplicationCommandInteraction
	| APIMessageComponentInteraction
	| APIModalSubmitInteraction
	| APIPingInteraction
