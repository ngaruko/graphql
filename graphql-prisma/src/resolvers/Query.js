const Query = {
	users(parent, args, { prisma }, info) { //jshint ignore:line
		const opArgs = {};
		if (args.query) {
			opArgs.where = {
				OR: [{
					name_contains: args.query
				},
					{
						email_contains: args.query
				}]
			};
		}
		return prisma.query.users(opArgs, info);
	
	},
	posts(parent, args, { prisma }, info) { //jshint ignore:line
		const opArgs = {};
		if (args.query) {
			opArgs.where = {
				OR: [{
					title_contains: args.query
				},
				{
					body_contains: args.query
				}]
			};
		}
		return prisma.query.posts(opArgs, info);
	// 	if (!args.query) {
	// 		return db.posts;
	// 	}

	// 	return db.posts.filter((post) => {
	// 		const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
	// 		const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
	// 		return isTitleMatch || isBodyMatch;
	// 	});
	// },
	// comments(parent, args, {
	// 	db
	// }, info) { //jshint ignore:line
	// 	return db.comments;
	// },
	// me() {
	// 	return {
	// 		id: '123098',
	// 		name: 'Mike',
	// 		email: 'mike@example.com'
	// 	};
	},
	post() {
		return {
			id: '092',
			title: 'GraphQL 101',
			body: '',
			published: false
		};
	}
};

export { Query as default };