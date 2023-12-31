export type User = {
  id: String;
  name: String;
  email: String;
  age: Number | null;
  posts?: Post[];
  comments?: Comment[];
};

export type Post = {
  id: String;
  title: String;
  body: String;
  published: Boolean;
  author: String;
  comments?: Comment[];
};

export type Comment = {
  id: String;
  text: String;
  author: String;
  post: String;
};

export enum MUTATION_TYPES {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED"
}

export type MutationTypes = 'CREATED' | 'UPDATED' | 'DELETED';