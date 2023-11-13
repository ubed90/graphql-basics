import DB from "../../DB";
import { User } from "../../types";

const Query = {
  users: (
    parent: any,
    { query }: { query?: string },
    ctx: { db: typeof DB },
    info: any
  ): User[] =>
    query
      ? ctx.db.users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      : ctx.db.users,
  me: (parent: any, args: any, ctx: { db: typeof DB }, info: any): User =>
    ctx.db.users[0],
};

export default Query;