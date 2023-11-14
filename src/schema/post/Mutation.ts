import { GraphQLError } from 'graphql';
import DB, { setData } from '../../DB';
import { MUTATION_TYPES, Post } from '../../types';
import { v4 as randomStringGenerator } from 'uuid';
import { GraphQLContext } from '../../context';

const Mutation = {
  createPost: (
    parent: any,
    { data }: { data: Post },
    { db, pubsub }: GraphQLContext
  ): Post => {
    const userExists = db.users.some((user) => user.id === data.author);

    if (!userExists) throw new GraphQLError('User Not Found!');

    const newPost: Post = {
      ...data,
      id: randomStringGenerator(),
    };

    db.posts.push(newPost);

    if (newPost.published)
      pubsub.publish('post', { post: { mutation: MUTATION_TYPES.CREATED, data: newPost } });

    return newPost;
  },
  deletePost: (
    parent: any,
    { id }: { id: string },
    { db, pubsub }: GraphQLContext
  ): Post => {
    const postIndex = db.posts.findIndex((post) => post.id === id);

    if (postIndex < 0) throw new GraphQLError('User not Found...');

    const removedPost = db.posts[postIndex];
    db.posts.splice(postIndex, 1);

    setData(
      'Comment',
      db.comments.filter((comment) => comment.post !== id)
    );

    if (removedPost.published)
      pubsub.publish('post', {
        post: {
          mutation: MUTATION_TYPES.DELETED,
          data: removedPost,
        },
      });

    return removedPost;
  },
  updatePost: (
    parent: any,
    { id, data }: { id: string; data: Post },
    { db, pubsub }: GraphQLContext
  ): Post => {
    const post = db.posts.find((post) => post.id === id);

    const originalPost = { ...post };

    if (!post) throw new GraphQLError('Post Not Found...');

    post.title = data.title || post.title;
    post.body = data.body || post.body;
    post.published = typeof data.published === 'boolean' ? data.published : post.published;

    console.log(data);

    if(originalPost.published && !post.published) {
      // Deleted
      pubsub.publish('post', { post: { mutation: MUTATION_TYPES.DELETED, data: originalPost as Post } });
    } else if(!originalPost.published && post.published) {
      // CREATED
      pubsub.publish('post', { post: { mutation: MUTATION_TYPES.CREATED, data: post } });
    } else if(post.published){
      // UPDATED
      pubsub.publish('post', { post: { mutation: MUTATION_TYPES.UPDATED, data: post } });
    }

    return post;
  },
};

export default Mutation;
