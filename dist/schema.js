export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        authors: [Author]
    }
`;
//* Notes
// exclamation mark means that a field can't be null
// Query type defines where a query can start from
// the (id: ID!) param allows for a single review to be accessed via the id field
