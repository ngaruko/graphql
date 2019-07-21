import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';

// Type definitions (schema)
const typeDefs = `
    
`;

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, { db }, info) { //jshint ignore:line
            if (!args.query) {
                return db.users;
            }

            return db.users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, args, { db }, info) { //jshint ignore:line
            if (!args.query) {
                return db.posts;
            }

            return db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return isTitleMatch || isBodyMatch;
            });
        },
        comments(parent, args, { db }, info) { //jshint ignore:line
            return db.comments;
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            };
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            };
        }
    },
    Mutation: {
        createUser(parent, args, { db }, info) { //jshint ignore:line
            const emailTaken = db.users.some((user) => user.email === args.data.email);

            if (emailTaken) {
                throw new Error('Email taken');
            }
            
            const user = {
                id: uuidv4(),
                ...args.data
            };

            db.users.push(user);

            return user;
        },
        deleteUser(parent, args, { db }, info) { //jshint ignore:line
            const userIndex = db.users.findIndex((user) => user.id === args.id);

            if (userIndex === -1) {
                //no user found
                throw new Error('User not found');
            }
            const deletedUsers = db.users.splice(userIndex, 1);
            //deleted related paost and comments 
            db.posts = db.posts.filter((post) => {
                //no matched db.posts
                const match = post.author === args.id;
                //delete all comments on posts
                if (match) {
                    db.comments = db.comments.filter((comment) => comment.post !== post.id);
                }
                return !match;

            });
            //delete all db.comments from db.users
            db.comments = db.comments.filter((comment) => comment.author !== args.author);
            return deletedUsers[0];
        },

        createPost(parent, args, { db }, info) { //jshint ignore:line
            const userExists = db.users.some((user) => user.id === args.data.author);

            if (!userExists) {
                throw new Error('User not found');
            }

            const post = {
                id: uuidv4(),
                ...args.data
            };

            db.posts.push(post);

            return post;
        },

        deletePost(parent, args, { db }, info) { //jshint ignore:line
            const postIndex = db.posts.findIndex((post) => post.id === args.id);

            if (postIndex === -1) {
                //no user found
                throw new Error('Post not found');
            }
            const deletedPosts = db.posts.splice(postIndex, 1);
            //deleted related db.comments 
            db.comments = db.comments.filter((comment) => comment.post !== args.id);
            return deletedPosts[0];
        },

        createComment(parent, args, { db }, info) { //jshint ignore:line
            const userExists = db.users.some((user) => user.id === args.data.author);
            const postExists = db.posts.some((post) => post.id === args.data.post && post.published);

            if (!userExists || !postExists) {
                throw new Error('Unable to find user and post');
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            };

            db.comments.push(comment);

            return comment;
        },

        deleteComment(parent, args, { db }, info) { //jshint ignore:line
            const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);
            //no need to delete related data
            if (commentIndex === -1) {
                //no user found
                throw new Error('Comment not found');
            }
            return db.comments.splice(commentIndex, 1)[0];
        },
    },
    Post: {
        author(parent, args, { db }, info) { //jshint ignore:line
            return db.users.find((user) => {
                return user.id === parent.author;
            });
        },
        comments(parent, args, { db }, info) { //jshint ignore:line
            return db.comments.filter((comment) => {
                return comment.post === parent.id;
            });
        }
    },
    Comment: {
        author(parent, args, { db }, info) { //jshint ignore:line
            return db.users.find((user) => {
                return user.id === parent.author;
            });
        },
        post(parent, args, { db }, info) { //jshint ignore:line
            return db.posts.find((post) => {
                return post.id === parent.post;
            });
        }
    },
    User: {
        posts(parent, args, { db }, info) { //jshint ignore:line
            return db.posts.filter((post) => {
                return post.author === parent.id;
            });
        },
        comments(parent, args, { db }, info) { //jshint ignore:line
            return db.comments.filter((comment) => {
                return comment.author === parent.id;
            });
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db
    }
});

server.start(() => {
    console.log('The server is up!');
});