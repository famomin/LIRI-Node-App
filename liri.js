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
var fs = require("fs");

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
	myTweets();
}

else if (sayA === "spotify-this-song") {
	spotifyThis(sayB);
}

else if (sayA === "movie-this") {
	movieThis(sayB);
}

else if (sayA === "do-what-it-says"){
	fs.readFile("random.txt", "utf8", function(error, data) {

	  	// We will then print the contents of data
		console.log(data);

		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");

		var sayC = dataArr[0];
		var sayD = dataArr[1];

		console.log(sayC);
		console.log(sayD);
	});

}

function myTweets () {
	var client = new twitterFS({
		consumer_key: consKey,
	  	consumer_secret: consKeySec,
		access_token_key: accKey,
		access_token_secret: accKeySec
	});
	 
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			 for (var i = 0; i < tweets.length; i++) {
                console.log('tweets: '+JSON.stringify(tweets[i].text, null, 2));
                console.log('time: '+JSON.stringify(tweets[i].created_at, null,2));
            }
	  	}
	});	
}

function spotifyThis (songName) {
	if (process.argv[3]){
		spotifyFS.search({ type: 'track', query: songName }, function(err, data) {
		    //to see the whole object of data
	 		//console.log(JSON.stringify(data, null, 2));

		 	console.log("Song: " + data.tracks.items[0].name);
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview: " + data.tracks.items[0].preview_url);	
		}); 
	}

	else {
		spotifyFS.search({ type: 'track', query: 'The Sign' }, function(err, data) {
		 	console.log("Song: " + data.tracks.items[0].name);
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview: " + data.tracks.items[0].preview_url);	
		}); 
	}

}

function movieThis (movieName) {
	if(movieName === ""){
		movieName = "Mr. Nobody"
	}

	var customURL = "http://www.omdbapi.com/?t="+ movieName +"&y=&plot=short&r=json&tomatoes=true";
	
	requestFS(customURL, function (error, response, body) {
		var movieData = JSON.parse(body);
		if (!error && response.statusCode == 200) {
			console.log("Title: " + movieData.Year);
			console.log("Year: " + movieData.Year);
			console.log("IMDB Rating: " + movieData.imdbRating);
			console.log("Country: " + movieData.Country);
			console.log("Lanugage(s): " + movieData.Language);
			console.log("Plot: " + movieData.Plot);
			console.log("Actors: " + movieData.Actors);
			console.log("Rotten Tomatoes Rating: " + movieData.tomatoMeter);
			console.log("Rotten Tomatoes Link: " + movieData.tomatoURL);
	  	}
	});
}