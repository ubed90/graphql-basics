import { PubSub, createPubSub } from "graphql-yoga";
import DB from "../DB";
import { PubSubChannels } from "../schema/Subscription";
import { CommentSubscription } from "../schema/comment/Subscription";
import { PostSubscription } from "../schema/post/Subscription";

// * Creating our SingleTon Pubsub Instance
type GlobalSubscription = PubSubChannels &
  PostSubscription &
  CommentSubscription;

const pubsub = createPubSub<GlobalSubscription>();

export type GraphQLContext = {
    db: typeof DB
    pubsub: PubSub<GlobalSubscription>
}

export function createContext(): GraphQLContext {
    return {
        db: DB,
        pubsub
    }
}