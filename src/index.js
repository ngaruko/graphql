import { GraphQLServer } from 'graphql-yoga';

// // Type definitions (schema)
// const typeDefs = `
//     type Query {
//         hello: String!
//         name: String!
//         location: String!
//         bio: String!
//     }
// `;
// // Resolvers
// const resolvers = {
// 	Query: {
// 		hello() {
// 			return 'This is my first query!';
// 		},
// 		name() {
// 			return 'Bede Ngaruko';
// 		},
// 		location() {
// 			return 'Auckland, NZ';
// 		},
// 		bio() {
// 			return 'I am excited to be learning this much!';
// 		}
// 	}
// };
//v

// Type definitions (schema)
const typeDefs = `
    type Query {
        Id: ID!
        name: String!
				age: Int!
				employed: Boolean
				GPA: Float
				
    }
`;
// Resolvers
const resolvers = {
	Query: {
		Id() {
			return 'k3274bwkyrynf2urr3';
		},
		name() {
			return 'Bede Ngaruko';
		},
		age() {
			return 44;
		},
		employed() {
			return true;
		},
		GPA() {
			return 4.8;
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => {
	console.log('The server is up!');
});
