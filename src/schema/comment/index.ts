import { readFileSync } from 'fs';

// * GraphQL
import Mutation from './Mutation';
import Query from './Query';
import Comment from "./Comment";
import Subscription from './Subscription';

export const typeDefs = `
    ${readFileSync(require.resolve('./commentSchema.graphql'), 'utf-8')}
`;

export const resolvers = {
  Query,
  Mutation,
  Comment,
  Subscription,
};
