import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
			"schemaPath": '/src/generated/prisma.graphql',
	typeDefs: '',
	endpoints: 'localhost:4466'

});