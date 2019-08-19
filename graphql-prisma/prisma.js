import { Prisma } from "prisma-binding";
//import { log } from "util";
//import chalk from 'chalk';


const prisma = new Prisma({
  schemaPath: "src/generated/prisma.graphql",
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

export { prisma as default };

/*

// //async
// const createPostForUser = async (authorId, data) => {
// 	//check if user exists
// 	const userExists = await prisma.exists.User({ id: authorId });
// 	if (!userExists) {
// 		throw new Error(`No user was found with Id ${authorId}...`);
// 	}
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     `{author {id name email posts{id title published}}}`
//   );

//   return post.author;
// };

// // use the function
// createPostForUser("cjz22gdq7000g08070s1i9zwu", {
//   title: "The new World falls appart",
//   body:
//     " A remarkable story of British occupation of Nigeria, by Chinua Achebe",
//   published: true
// }).then((user) => log(JSON.stringify(user, undefined, 2))).catch((error) => log(chalk.red(error.message)));



//update post for user
const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({ id: postId });
  if (!postExists) {
    throw new Error(`No post was found with Id ${postId}...`);
  }

  //update
  log(chalk.green(`Updating post with id ${postId}....`));
  const post = await prisma.mutation.updatePost({
    where: {
      id:postId
    },
    data
  }, `{author {id name email posts{id title published}}}`);
  return post.author;
};

updatePostForUser('cjz237u6j0009070777yw22y2', {published: false}).then((user) => log(chalk.green(JSON.stringify(user, undefined, 2))))
  .catch((error) => log(chalk.red(error.message)));

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
*/