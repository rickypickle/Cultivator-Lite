Share = {
	
	postProperties: { // when a user inputs contents to share we populate this object's vars
		comment: "",	
		link: "",
		hashTags: {},
		postType: "",
		coverPic: "",
		originalContent: false,
		dateAndTime: ""		
	},
	
	behaviours: {
		savePost: function(comment, link, hashTags, postType, coverPic, originalContent, dateAndTime){ // sets the values of postProperties
			Share.postProperties.comment = comment;
			Share.postProperties.link = link;
			Share.postProperties.hashTags = hashTags.split(" ");
			Share.postProperties.postType = postType;
			Share.postProperties.coverPic = coverPic;
			Share.postProperties.originalContent = originalContent;
			Share.postProperties.dateAndTime = dateAndTime;
			
			// now add new shared item to feed, creating a unique id with date time and comment
			//UserData.contentContainer[dateAndTime + comment] = Share.postProperties;
			// perhaps it's better to post object to feed at back end and then retrieve updated feed again...
		},
		
		saveToBackend: function(){ // send post to gs back end feed object
			
		},
		
		postToFacebook: function(){// post new feed item to facebook timeline
			
		}
	}
	
	
};
