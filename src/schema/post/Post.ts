import DB from "../../DB";
import { Post } from "../../types";

const Post = {
  author: (parent: Post, args: any, { db }: { db: typeof DB }, info: any) => {
    return db.users.find((user) => user.id === parent.author);
  },
  comments: (parent: Post, args: any, { db }: { db: typeof DB }) => {
    return db.comments.filter((comment) => parent.id === comment.post);
  },
};

export default Post