import { PubSub, createPubSub } from "graphql-yoga";
import { GraphQLContext } from "../context";

// * Subscription PubSub
export type PubSubChannels = {
    count: [{ count: Number }]
}

const resolvers = {
  Subscription: {
    count: {
      subscribe: (
        parent: any,
        args: any,
        { pubsub }: GraphQLContext
      ) => {
        let count = 0;

        setInterval(() => {
            count++
            pubsub.publish('count', {
                count
            })
        }, 1000)

        return pubsub.subscribe('count');
      },
    },
  },
};

export default resolvers;