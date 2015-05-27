Discover = {
	
	user: { // Discover new users
		
		
	},
	
	content: { // discover new content
		
		properties: {
			suggestedContent: {}, // this is populated by the algorithm that determines most suited content to suggest
			contentIndex: 0
		},
		
		behaviours: {
		
			getContentDisplayList: function(){ // queries content based on user's likes and interactions at that time 
											   // and stores them in new object to be transferred to current content object
				
			},
			
			likeContent: function(){ // swipe right, call reputation updater for user and for content, add hash tags to user data
				
			},
			
			dislikeContent: function(){ // swipe left, call reputation updater for user and for content, remove hash tags from user data
				
			},
			
			refreshcurrentContent: function(){ // update current content to new object with fresh suggestions
				Discover.content.properties.suggestedContent = Discover.content.behaviours.getContentDisplayList();
			},
			
			viewContent: function(){ // fully open content
				
			}
		
		}
	}
	
};
