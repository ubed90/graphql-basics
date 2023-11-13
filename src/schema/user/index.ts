import { readFileSync } from "fs";

// * GraphQL
import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";

export const typeDefs = `
    ${readFileSync(require.resolve('./userSchema.graphql'), 'utf-8')}
`

export const resolvers = {
  Query,
  Mutation,
  User,
}; 