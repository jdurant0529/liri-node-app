var LLL = require('./key.js');
var fs = require('fs');

var nodeArgs = process.argv;

var search = '';

for (var i=3; i<nodeArgs.length; i++){

    if (i>3 && i< nodeArgs.length){

        search = search + "+" + nodeArgs[i];

    }

    else {

        search = search + nodeArgs[i];
    }
}

var option = process.argv[2];
//var search = process.argv[3];

console.log(search);
if (option == 'do-what-it-says') {
    sayWhat();
}


if (option == null) {
    console.log('Options are: my-tweets, spotify-this-song, movie-this, or do-what-it-says');
} else if (option == 'my-tweets') {
    tweet();

} else if (option == 'spotify-this-song') {

    if (search == null) {
        search = "what's my age again"
    }
    song(search);

} else if (option == 'movie-this') {
    if (search == null) {
        search = 'Mr. Nobody'
    }
    movie(search);

} else {
    console.log('You dont follow directions very well.')
}

function movie(search) {
    var request = require('request');

    var url = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&tomatoes=true&r=json';

    request(url, function(err, response, body) {
        //console.log(body);
        body = JSON.parse(body);
        console.log('IMDB Results:')
        console.log('--------------');
        console.log('Title: ' + body.Title);
        console.log('Year: ' + body.Year);
        console.log('IMDB Rating: ' + body.imdbRating);
        console.log('Country: ' + body.Country);
        console.log('Language: ' + body.Language);
        console.log('Plot: ' + body.Plot);
        console.log('Actors: ' + body.Actors);
        console.log('Rotten Tomato Rating: ' + body.tomatoUserRating);
        console.log('Rotten Tomato URL: ' + body.tomatoURL);

        var logThis = 'IMDB Results: \n--------------\nTitle: ' + body.Title + '\nYear: ' + body.Year + '\nIMDB Rating: ' + body.imdbRating + '\nCountry: ' + body.Country + '\nLanguage: ' + body.Language + '\nPlot: ' + body.Plot + '\nActors: ' + body.Actors + '\nRotten Tomato Rating: ' + body.tomatoUserRating + '\nRotten Tomato URL: ' + body.tomatoURL + '\n*******************\n\n';

        console.log(logThis);
        addToLog(logThis);

    })


}

function song(search) {
    var spotify = require('spotify');

    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // console.log(data.tracks.items[0]);
        console.log('spotifying')
        console.log('--------------');
        console.log('Artist(s): ' + data.tracks.items[0].artists[0].name)
        console.log('Song Name: ' + data.tracks.items[0].name);
        console.log('Preview Link: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);

        var logThis = 'Spotify Results\n--------------\nArtist(s):' + data.tracks.items[0].artists[0].name + '\nSong Name: ' + data.tracks.items[0].name + '\nPreview Link: ' + data.tracks.items[0].preview_url + '\nAlbum: ' + data.tracks.items[0].album.name + '\n*******************\n\n';
        addToLog(logThis);

    });
}

function tweet() {
    var Twit = require('twitter')
    var config = require('./key.js');

    var T = new Twit(config.tweetKey)
    
    console.log('20 most recent Tweets:');
    console.log('----------------------');
    T.get('statuses/user_timeline', { screen_name: 'JRDurant', count: 20 }, function(err, data, response){
       var logThis = 'Twitter Results\n--------------\n';
        for (var i = 0; i < data.length; i++) {

            console.log(data[i].created_at + " " + data[i].text);
            var tweet_date = data[i].created_at;
            var tweet_text = data[i].text;
        logThis = logThis + '\n' + tweet_date + " - " + tweet_text ;
        }
        logThis = logThis +'\n*******************\n\n'
        addToLog(logThis);
    })
    
}

function sayWhat() {
    fs.readFile('./random.txt', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        output = data.split(',');
        option = output[0];
        search = output[1];

        if (option == 'spotify-this-song') {
            song(search);
        } else if (option == 'movie-this') {
            movie(search);
        }
    });
}

function addToLog(log) {
    // This block of code will create a file called "movies.txt".
    // It will then print "Inception, Die Hard" in the file
    fs.appendFile("log.txt", log, function(err) {

        // If the code experiences any errors it will log the error to the console. 
        if (err) {
            return console.log(err);
        }

        // Otherwise, it will print: "movies.txt was updated!"
        console.log("log.txt was updated!");
    });
}
