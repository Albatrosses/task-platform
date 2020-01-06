import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { generateLog } from "../helper/log";
import { mutationCollect, queryCollect } from "./config/graphql";

const collectiveSchema: any = importSchema(
  process.cwd() + "/schemas/main.graphql"
);

const typeDefs: any[] = [collectiveSchema];

const resolvers = {
  Query: {
    ...queryCollect
  },
  Mutation: {
    ...mutationCollect
  }
};

const graphqlServer = app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      req,
      res
    })
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    generateLog(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

export default graphqlServer;
