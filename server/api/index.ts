import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import resolvers from "./resolvers/";

const collectiveSchema: any = importSchema(
  process.cwd() + "/schemas/collectiveSchema.graphql"
);

const typeDefs: any[] = [collectiveSchema];

const graphqlServer = app => {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

export default graphqlServer;
