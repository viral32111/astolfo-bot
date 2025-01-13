import type { AutoRouterType } from "itty-router"

import type { Route } from "~/enumerations/route"

export type RegisterRouteFunction = (router: AutoRouterType, path?: Route | string) => void
