import DB, { setData } from "../../DB";
import { User } from "../../types";
import { v4 as randomStringGenerator } from 'uuid';

const Mutation = {
  createUser: (
    parent: any,
    { data }: { data: User },
    ctx: { db: typeof DB }
  ): User => {
    const emailTaken = ctx.db.users.some((user) => user.email === data.email);

    if (emailTaken) {
      throw new Error('Email Already Taken');
    }

    const newUser: User = {
      ...data,
      id: randomStringGenerator(),
    };

    ctx.db.users.push(newUser);
    return newUser;
  },
  deleteUser: (
    parent: any,
    { id }: { id: string },
    ctx: { db: typeof DB }
  ): User => {
    const userIndex = ctx.db.users.findIndex((user) => user.id === id);

    if (userIndex < 0) throw new Error('User not Found...');

    const removedUser = ctx.db.users[userIndex];
    ctx.db.users.splice(userIndex, 1);

    setData(
      'Post',
      ctx.db.posts.filter((post) => {
        const isMatch = post.author === removedUser.id;

        if (isMatch) {
          setData(
            'Comment',
            ctx.db.comments.filter((comment) => comment.post !== post.id)
          );
        }

        return !isMatch;
      })
    );

    setData(
      'Comment',
      ctx.db.comments.filter((comment) => comment.author !== removedUser.id)
    );

    return removedUser;
  },
  updateUser: (
    parent: any,
    { id, data }: { id: string, data: User },
    ctx: { db: typeof DB }
  ): User => {
    const user = ctx.db.users.find(user => user.id === id)

    if(!user) throw new Error('User not Found...')

    if(!data.email) throw new Error("Email Should be Provided")

    const emailTaken = ctx.db.users.some((user) => user.email === data.email);

    if(emailTaken) throw new Error("Email Already in Use...")

    user.email = data.email || user.email
    user.name = data.name || user.name
    user.age = data.age || user.age
    
    return user;
  },
};

export default Mutation;