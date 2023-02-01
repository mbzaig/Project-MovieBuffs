
var giphyAPIKey=giphyAPI;
var marvelAPIKey=marvelAPI;


var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key="+giphyAPIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

