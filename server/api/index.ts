import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers/queryResolver';
import { importSchema } from 'graphql-import';

const collectiveSchema: any = importSchema(process.cwd() + '/schemas/collectiveSchema.graphql');

const typeDefs: Array<any> = [collectiveSchema];

const graphqlServer = (app) => {
   
  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

export default graphqlServer;