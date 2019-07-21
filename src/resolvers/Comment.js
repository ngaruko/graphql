const Comment = {
	author(parent, args, {
		db
	}, info) { //jshint ignore:line
		return db.users.find((user) => {
			return user.id === parent.author;
		});
	},
	post(parent, args, {
		db
	}, info) { //jshint ignore:line
		return db.posts.find((post) => {
			return post.id === parent.post;
		});
	}
};

export { Comment as default };