import DB from "../../DB";
import { Comment } from "../../types";

const Comment = {
  author: (parent: Comment, args: any, { db }: { db: typeof DB }) => {
    return db.users.find((user) => user.id === parent.author);
  },
  post: (parent: Comment, args: any, { db }: { db: typeof DB }) => {
    return db.posts.find((post) => post.id === parent.post);
  },
};

export default Comment;
