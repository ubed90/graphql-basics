import DB from '../../DB';
import { User } from '../../types';

const User = {
  posts: (parent: User, args: any, ctx: { db: typeof DB }, info: any) => {
    return ctx.db.posts.filter((post) => post.author === parent.id);
  },
  comments: (parent: User, args: any, ctx: { db: typeof DB }) => {
    return ctx.db.comments.filter((comment) => comment.author === parent.id);
  },
};


export default User;