const Subscrition = {
	count: {
		subscribe(parent, args,{pubSub}, info) {//jshint ignore:line
			let count = 0;
			setInterval(() => {
				count++;
				pubSub.publish('count', {
					count
				});
				
			}, 1000);

			return pubSub.asyncIterator('count');

		}

	},

	comment: {
		subscribe(parent, {postId}, {pubSub, db}, info) { //jshint ignore:line
			const post = db.posts.find((post) => post.id === postId && post.published);
			if (!post) {
				throw new Error('Post not found');
			}

			return pubSub.asyncIterator(`comment ${postId}`);

		}
	}

	
};

export { Subscrition as default };