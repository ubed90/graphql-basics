import { makeExecutableSchema } from "@graphql-tools/schema"

// * Type Defs

// ? User
import { typeDefs as UserSchema, resolvers as UserResolvers } from "./user";

// ? Post
import { typeDefs as PostSchema, resolvers as PostResolvers } from "./post";

// ? Comment
import { typeDefs as CommentSchema, resolvers as CommentResolvers } from "./comment";

// * Dynamic Imports
import { readFileSync } from "fs";
import { mergeResolvers } from "@graphql-tools/merge";

const typeDefinitions = `
  ${readFileSync(require.resolve('./schema.graphql'), 'utf-8')}
`;


export const schema = makeExecutableSchema({
  typeDefs: [typeDefinitions, UserSchema, PostSchema, CommentSchema],
  resolvers: mergeResolvers([UserResolvers, PostResolvers, CommentResolvers])
});