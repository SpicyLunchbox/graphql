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
        reviews: () => {
            return db.reviews;
        },
        review: (parent, args, context) => {
            return db.reviews.find((review) => review.id === args.id);
        },
        authors: () => {
            return db.authors;
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers, // handles queries to API.  Think of it as request handlers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log("Server ready at port", 4000);
