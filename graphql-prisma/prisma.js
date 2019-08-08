import { Prisma } from 'prisma-binding';
import { log } from 'util';


const prisma = new Prisma({
			"schemaPath": 'src/generated/prisma.graphql',
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466'

});

//async
const createPostForUser = async (authorId,data) => {
	
};


// prisma.exists.User({
// name:"Bede Ngaruko "
// }).then((result) => log(result));
// prisma.exists.Post({
// 	id: "cjz2c34q300ev0807zscgzk5n"
// }).then((result) => log(result));
// prisma.query.users(null, '{id name email posts {id title}}').then((data) => {
// 	console.log(JSON.stringify(data,undefined,2));
// });

// prisma.mutation.createUser({
// 	data: {
// 		name: "Kana  ale",
// 		email: "kana@aaaa.com"
// 	}
// },
// 	'{id name email }').then((data) => {
// 		log(data);
// 	});

// prisma.mutation.createPost({
// 	data: {
// 		title: "Chaining promises",
// 		body: "The story of Chinua achebe about brits in nigeria",
// 		published: true,
// 		author: {
// 			connect: {
// 				email: "bede@ngaruko.com"
// 			}
// 		}
			
// 	}
// },
// 	'{id title body published author{name} }').then((data) => {

// 		log(JSON.stringify(data, undefined, 2));
// 		return prisma.query.users(null, '{id name email posts {id title}}');
		
// 	}).then((data) => {

// 		log(JSON.stringify(data, undefined, 2));

// 	});

