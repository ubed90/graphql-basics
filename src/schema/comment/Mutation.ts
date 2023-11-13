import DB from "../../DB";
import { Comment } from '../../types';
import { v4 as randomStringGenerator } from 'uuid';

const Mutation = {
  createComment: (
    parent: any,
    { data }: { data: Comment },
    { db }: { db: typeof DB }
  ): Comment => {
    const userExists = db.users.some((user) => user.id === data.author);

    const post = db.posts.find((post) => post.id === data.post);

    if (!userExists || !post || !post.published)
      throw new Error('User or Post not Found!');

    const newComment: Comment = {
      ...data,
      id: randomStringGenerator(),
    };

    db.comments.push(newComment);

    return newComment;
  },
  deleteComment: (
    parent: any,
    { id }: { id: string },
    { db }: { db: typeof DB }
  ): Comment => {
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);

    if (commentIndex < 0) throw new Error('Comment Not Found!');

    const removedComment = db.comments[commentIndex];

    db.comments.splice(commentIndex, 1);

    return removedComment;
  },
  updateComment: (
    parent: any,
    { id, data }: { id: string, data: string },
    { db }: { db: typeof DB }
  ): Comment => {
    const comment = db.comments.find(comment => comment.id === id);

    if(!comment) throw new Error("Comment Not Found...")

    comment.text = data;

    return comment;
  },
};

export default Mutation;
