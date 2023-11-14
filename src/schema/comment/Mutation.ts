import { GraphQLError } from "graphql";
import DB from "../../DB";
import { Comment } from '../../types';
import { v4 as randomStringGenerator } from 'uuid';
import { GraphQLContext } from "../../context";

const Mutation = {
  createComment: (
    parent: any,
    { data }: { data: Comment },
    { db, pubsub }: GraphQLContext
  ): Comment => {
    const userExists = db.users.some((user) => user.id === data.author);

    const post = db.posts.find((post) => post.id === data.post);

    if (!userExists || !post || !post.published)
      throw new GraphQLError('User or Post not Found!');

    const newComment: Comment = {
      ...data,
      id: randomStringGenerator(),
    };

    db.comments.push(newComment);

    pubsub.publish(`comment ${data.post}`, { comment: { mutation: "CREATED", data: newComment } })

    return newComment;
  },
  deleteComment: (
    parent: any,
    { id }: { id: string },
    { db, pubsub }: GraphQLContext
  ): Comment => {
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);

    if (commentIndex < 0) throw new GraphQLError('Comment Not Found!');

    const removedComment = db.comments[commentIndex];

    db.comments.splice(commentIndex, 1);

    pubsub.publish(`comment ${removedComment.post}`, {
      comment: { mutation: 'DELETED', data: removedComment },
    });

    return removedComment;
  },
  updateComment: (
    parent: any,
    { id, data }: { id: string, data: string },
    { db, pubsub }: GraphQLContext
  ): Comment => {
    const comment = db.comments.find(comment => comment.id === id);

    if(!comment) throw new GraphQLError('Comment Not Found...');

    comment.text = data;

    pubsub.publish(`comment ${comment.post}`, {
      comment: { mutation: 'UPDATED', data: comment },
    });

    return comment;
  },
};

export default Mutation;
