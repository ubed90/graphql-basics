import DB from "../../DB";
import { Post } from "../../types";

const Query = {
  posts: (parent: any, args: any, { db }: { db: typeof DB }): Post[] =>
    db.posts,
};


export default Query;