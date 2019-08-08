const Post = {
	author(parent, args, {
		db
	}, info) { //jshint ignore:line
		return db.users.find((user) => {
			return user.id === parent.author;
		});
	},
	comments(parent, args, {
		db
	}, info) { //jshint ignore:line
		return db.comments.filter((comment) => {
			return comment.post === parent.id;
		});
	}
};

export { Post as default };