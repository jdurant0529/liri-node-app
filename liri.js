var LLL = require('./key.js');

var option = process.argv[2];
var search = process.argv[3];

console.log(option);
console.log(search);



if (option == 'my-tweets') {
    console.log('tweet tweet');
    var Twit = require('twitter')
    var config = require('./key.js');

    var T = new Twit(config)
       // console.log(T);
    T.get('statuses/user_timeline', { screen_name: 'JRDurant', count: 2 }, function(err, data, response) {

          for (var i = 0; i < data.length; i++)

          console.log(data[i].text);
        })

} else if (option == 'spotify-this-song') {
    console.log('spotifying')
    if (search == null) {
        search = "what's my age again"
    }
    console.log(search);
} else if (option == 'movie-this') {
    console.log('movie stuff');
    if (search == null) {
        search = 'Mr. Nobody'
    }
    console.log(search);
} else if (option == 'do-what-it-says') {
    console.log('doing what it says');
} else {
    console.log('You dont follow directions very well.')
}
///console.log(LLL.twitterKeys);
