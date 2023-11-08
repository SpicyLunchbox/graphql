import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// fully-qualified imports are needed when feeding ES6 modules to Node.js
// which is why .js is added to the below imports
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games: () => {
      return db.games;
    },
    game: (parent, args, context) => {
      return db.games.find((game) => game.id === args.id);
    },
    reviews: () => {
      return db.reviews;
    },
    review: (parent, args, context) => {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors: () => {
      return db.authors;
    },
    author: (parent, args, context) => {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews: (parent) => {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews: (parent) => {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author: (parent) => {
      return db.authors.find((a) => a.id === parent.id);
    },
    game: (parent) => {
      return db.games.find((g) => g.id === parent.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs, // typeDefs are the schema for the graph
  resolvers, // handles queries to API.  Think of it as request handlers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port", 4000);
