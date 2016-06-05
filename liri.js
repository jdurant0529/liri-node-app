var LLL = require('./key.js');
var fs = require('fs');


var option = process.argv[2];
var search = process.argv[3];

//console.log(option);
//console.log(search);



if (option == 'my-tweets') {
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

} else if (option == 'do-what-it-says') {
    console.log('doing what it says');

} else {
    crap();
    console.log('You dont follow directions very well.')
}
///console.log(LLL.twitterKeys);



function movie(search) {
    var request = require('request');

    var url = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&tomatoes=true&r=json';

    request(url, function(err, response, body) {
        //console.log(body);
        body = JSON.parse(body);
        console.log('Title: ' + body.Title);
        console.log('Year: ' + body.Year);
        console.log('IMDB Rating: ' + body.imdbRating);
        console.log('Country: ' + body.Country);
        console.log('Language: ' + body.Language);
        console.log('Plot: ' + body.Plot);
        console.log('Actors: ' + body.Actors);

        //http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=demolition+man&page_limit=10&page=1&apikey=
        console.log('Rotten Tomatoe Rating: ' + body.tomatoUserRating);
        console.log('Rotten Tomatoe URL: ' + body.tomatoURL);
    })


}

function song(search) {
    var request = require('request');
    var Spot = require('spotify-web-api-node');
    var config = require('./key.js');

    var S = new Spot();
    //    https://developer.spotify.com/web-api/console/get-search-item/?q=muse&type=track

    S.searchTracks('track:' + search)
        .then(function(data) {
            console.log(data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });


    // var url = 'https://developer.spotify.com/web-api/console/get-search-item/?q=' + search + 'type=track' + '-H "Authorization: Bearer BQBDINp_8az6EDjhlRMbqeljsicUEAnQJDRPggftPy0gUxdzrIza1Tmm3ZCNwXoQU02HLcYp4BDWe-NWo0lWRABA0f_K5ewlLkuB6jT_GgPAZ_f06YoFcmDlmGYVfEr6q5hglVtl4D52IbPLgQjT7IeG41w"'
    //     request(url, function(err, response, body) {
    //             //console.log(body);
    //             body = JSON.parse(body);
    //             console.log(body);
    //             console.log('spotifying')
    //             console.log('----------');
    //             console.log('Artist(s): ')
    //             console.log('Song Name: ');
    //             console.log('Preview Link: ');
    //             console.log('Album: ');
    //         })
}

function tweet() {
    var Twit = require('twitter')
    var config = require('./key.js');

    var T = new Twit(config.tweetKey)

    T.get('statuses/user_timeline', { screen_name: 'JRDurant', count: 20 }, function(err, data, response) {

        for (var i = 0; i < data.length; i++)

            console.log(data[i].created_at + " " + data[i].text);
    })

}

function sayWhat() {

}

function addToLog() {
    // This block of code will create a file called "movies.txt".
    // It will then print "Inception, Die Hard" in the file
    fs.appendFile("log.txt", 'Inception, Die Hard', function(err) {

        // If the code experiences any errors it will log the error to the console. 
        if (err) {
            return console.log(err);
        }

        // Otherwise, it will print: "movies.txt was updated!"
        console.log("movies.txt was updated!");
    });
}

function crap() {
    var SpotifyWebApi = require("../");

    /*
     * This example shows how to search for a track. The endpoint is documented here:
     * https://developer.spotify.com/web-api/search-item/
     * Please note that this endpoint does not require authentication. However, using an access token
     * when making requests will give your application a higher rate limit.
     */

    var spotifyApi = new SpotifyWebApi();

    spotifyApi.searchTracks('Love', function(err, data) {
        if (err) {
            console.error('Something went wrong', err.message);
            return;
        }

        // Print some information about the results
        console.log('I got ' + data.body.tracks.total + ' results!');

        // Go through the first page of results
        var firstPage = data.body.tracks.items;
        console.log('The tracks in the first page are.. (popularity in parentheses)');

        /*
         * 0: All of Me (97)
         * 1: My Love (91)
         * 2: I Love This Life (78)
         * ...
         */
        firstPage.forEach(function(track, index) {
            console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
        });
    });
}
