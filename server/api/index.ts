import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { updateTaskDetail } from "./task/mutation";
import { heroImage, taskDetail, taskListing } from "./task/query";

const collectiveSchema: any = importSchema(
  process.cwd() + "/server/schemas/collectiveSchema.graphql"
);

const typeDefs: any[] = [collectiveSchema];

const resolvers = {
  Query: {
    taskListing,
    taskDetail,
    heroImage
  },
  Mutation: {
    updateTaskDetail
  }
};

const graphqlServer = app => {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

export default graphqlServer;
