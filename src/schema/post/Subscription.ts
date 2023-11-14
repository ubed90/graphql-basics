import { GraphQLContext } from "../../context";
import { MutationTypes, Post } from "../../types";

export type PostSubscription = {
  post: [{ post: { mutation: MutationTypes; data: Post } }];
};

const Subscription = {
    post: {
        subscribe: (parent: any, args: any, { pubsub } : GraphQLContext) => {
            return pubsub.subscribe('post')
        }
    }
}

export default Subscription;