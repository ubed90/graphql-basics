import { GraphQLError } from "graphql"
import { GraphQLContext } from "../../context"
import { Comment, MutationTypes } from "../../types"

export type CommentSubscription = {
    [key: string]: [{ comment: { mutation: MutationTypes, data: Comment } }]
}

const Subscription = {
    comment: {
        subscribe: (parent: any, { postId }: { postId: string }, { db, pubsub }: GraphQLContext) => {
            const post = db.posts.find(post => post.id === postId && post.published)

            if(!post) throw new GraphQLError('Post Not Found or Not Published')

            return pubsub.subscribe(`comment ${post.id}`)
        }
    }
}

export default Subscription