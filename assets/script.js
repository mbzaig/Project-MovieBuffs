
var giphyAPIKey="71Fx9egDGUwycT4oDZ7Bak9l6ifEFDNW";
var rottenAPIKey=" ";


var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=71Fx9egDGUwycT4oDZ7Bak9l6ifEFDNW";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

