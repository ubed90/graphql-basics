import { readFileSync } from "fs";

// * GraphQL
import Mutation from "./Mutation";
import Post from "./Post";
import Query from "./Query";

export const typeDefs = `
    ${readFileSync(require.resolve('./postSchema.graphql'), 'utf-8')}
`

export const resolvers = {
  Query,
  Mutation,
  Post,
};