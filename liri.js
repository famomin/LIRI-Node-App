//requireing Keys.js file
var keysNeeded = require("./keys.js");

//importing twitter keys
var consKey = keysNeeded.twitterKeys.consumer_key;
var consKeySec = keysNeeded.twitterKeys.consumer_secret;
var accKey = keysNeeded.twitterKeys.access_token_key;
var accKeySec = keysNeeded.twitterKeys.access_token_secret;

//requireing three pacakges needed for assignment
var twitterFS = require("twitter");
var spotifyFS = require("spotify");
var requestFS = require("request");

//console.log(consKey);
//console.log(consKeySec);
//console.log(accKey);
//console.log(accKeySec);

// assigning variable to the arguement in index 3
var sayA = process.argv[2];

// Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the address
var sayB = "";


// Capture all the words for song and movie names
for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the movie/song name.
  sayB = sayB + " " + nodeArgs[i];
}


if (sayA === "my-tweets") {
	var client = new twitterFS({
		consumer_key: consKey,
	  	consumer_secret: consKeySec,
		access_token_key: accKey,
		access_token_secret: accKeySec
	});
	 
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
	    	console.log(tweets);
	  	}
	});

}

else if (sayA === "spotify-this-song") {
	if(sayB === ""){
		sayB = "The Sign by Ace of Base";
	}

	spotifyFS.search({ type: 'track', query: sayB }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    
	    //to see the whole object of data
 		//console.log(JSON.stringify(data, null, 2));

	 	console.log("Song: " + sayB);
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview: " + data.tracks.items[0].preview_url);	
	});
}

else if (sayA === "movie-this"){

}

else if (sayA === "do-what-it-says"){

}