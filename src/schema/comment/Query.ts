import DB from "../../DB";
import { Comment } from "../../types";

const Query = {
  comments: (parent: any, args: any, { db }: { db: typeof DB }): Comment[] =>
    db.comments,
};

export default Query