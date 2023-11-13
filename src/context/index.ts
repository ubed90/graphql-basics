import { PubSub } from "graphql-yoga";
import DB from "../DB";
import { PubSubChannels, pubsub } from "../schema/Subscription";

export type GraphQLContext = {
    db: typeof DB
    pubsub: PubSub<PubSubChannels>
}

export function createContext(): GraphQLContext {
    return {
        db: DB,
        pubsub
    }
}