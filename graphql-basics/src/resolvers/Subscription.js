const Subscrition = {

	comment: {
		subscribe(parent, {postId}, {pubSub, db}, info) { //jshint ignore:line
			const post = db.posts.find((post) => post.id === postId && post.published);
			if (!post) {
				throw new Error('Post not found');
			}

			return pubSub.asyncIterator(`comment ${postId}`);

		}
	},

	post: {
		subscribe(parent, args, { pubSub }, info) { //jshint ignore:line
		
					return pubSub.asyncIterator(`post`);
		}
	}

	
};

export { Subscrition as default };