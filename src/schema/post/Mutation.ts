import DB, { setData } from "../../DB";
import { Post } from "../../types";
import { v4 as randomStringGenerator } from 'uuid';

const Mutation = {
  createPost: (
    parent: any,
    { data }: { data: Post },
    { db }: { db: typeof DB }
  ): Post => {
    const userExists = db.users.some((user) => user.id === data.author);

    if (!userExists) throw new Error('User Not Found!');

    const newPost: Post = {
      ...data,
      id: randomStringGenerator(),
    };

    db.posts.push(newPost);

    return newPost;
  },
  deletePost: (
    parent: any,
    { id }: { id: string },
    { db }: { db: typeof DB }
  ): Post => {
    const postIndex = db.posts.findIndex((post) => post.id === id);

    if (postIndex < 0) throw new Error('User not Found...');

    const removedPost = db.posts[postIndex];
    db.posts.splice(postIndex, 1);

    setData(
      'Comment',
      db.comments.filter((comment) => comment.post !== id)
    );

    return removedPost;
  },
  updatePost: (
    parent: any,
    { id, data }: { id: string, data: Post },
    { db }: { db: typeof DB }
  ): Post => {
    const post = db.posts.find(post => post.id === id)

    if(!post) throw new Error('Post Not Found...')

    post.title = data.title || post.title
    post.body = data.body || post.body
    post.published = data.published || post.published

    return post;
  },
};

export default Mutation;