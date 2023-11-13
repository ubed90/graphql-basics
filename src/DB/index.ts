import { User, Post, Comment } from '../types';

let users: User[] = [
  {
    id: '1',
    name: 'Ubed',
    email: 'shaikhobaid123@gmail.com',
    age: null,
  },
  {
    id: '2',
    name: 'Zaid',
    email: 'shaikhzaid123@gmail.com',
    age: 25,
  },
];

let posts: Post[] = [
  {
    id: 'our987',
    title: 'Post Title',
    body: 'Post Body',
    published: true,
    author: '2',
  },
  {
    id: 'jhsacf156',
    title: 'Post Title 2',
    body: 'Post Body 2',
    published: false,
    author: '1',
  },
  {
    id: 'asfl45632',
    title: 'Post Title 3',
    body: 'Post Body 3',
    published: true,
    author: '1',
  },
  {
    id: 'ldlvmd098',
    title: 'Post Title 4',
    body: 'Post Body 4',
    published: false,
    author: '2',
  },
];

let comments: Comment[] = [
  {
    id: '1',
    text: 'First Comment',
    author: '1',
    post: 'our987',
  },
  {
    id: '2',
    text: 'Second Comment',
    author: '2',
    post: 'jhsacf156',
  },
  {
    id: '3',
    text: 'Third Comment',
    author: '1',
    post: 'asfl45632',
  },
  {
    id: '4',
    text: 'Fourth Comment',
    author: '2',
    post: 'ldlvmd098',
  },
];

export const setData = (type: string, data: User[] | Post[] | Comment[]) => {
  switch (type) {
    case 'User':
      users = data as User[];
      break;

    case 'Comment':
      comments = data as Comment[];
      break;

    case 'Post':
      posts = data as Post[];
      break;
  }
};


export default {
    users,
    posts,
    comments
}