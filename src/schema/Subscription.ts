import { PubSub, createPubSub } from "graphql-yoga";

// * Subscription PubSub
export type PubSubChannels = {
    count: [{ count: Number }]
}

export const pubsub = createPubSub<PubSubChannels>()

const resolvers = {
  Subscription: {
    count: {
      subscribe: (
        parent: any,
        args: any,
        { pubsub }: { pubsub: PubSub<any> }
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