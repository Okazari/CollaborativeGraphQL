import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typedefs.gql';
import resolvers from './resolvers';

export default makeExecutableSchema({
    typeDefs,
    resolvers,
});
