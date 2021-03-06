import { GraphQLServer } from 'graphql-yoga';
import { PubSub} from 'graphql-yoga';


import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import prisma from '../prisma';

const port = process.env.PORT || 4000;

const pubSub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubSub,
        prisma
    }
});

server.start(() => {
    console.log(`The server is up and running on port ${port}!`);
});