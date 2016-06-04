var LLL = require('./key.js');

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
    console.log('You dont follow directions very well.')
}
///console.log(LLL.twitterKeys);



function movie(search) {
    var request = require('request');
    
    var url = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&r=json';

    request(url, function(err, response, body) {
        //console.log(body);
        body = JSON.parse(body);
        console.log(body.Title);
        console.log(body.Released);
    })
}

function song(search) {
    console.log('spotifying')
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
