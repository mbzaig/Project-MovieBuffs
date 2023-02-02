
var giphyAPIKey=giphyAPI;
var marvelAPIKey=marvelAPI;//Private API Key Marvel
var marvelPAPIKey=marvelPAPI;//Public API Key Marvel


//Marvel

//Marvel API CAll structure : http://gateway.marvel.com/v1/public/comics?ts=1&apikey=PublicAPI&hash=md5(ts+privateAPI+PublicAPI) (the hash value is the md5 digest of 1abcd1234)
function marvelHash(){
    var ts= new Date().getTime();
    console.log("TimeStampe "+ts);
    var md5Hash=ts+marvelAPIKey+marvelPAPIKey;
    console.log("Original MD5 "+ md5Hash);
    var strHash = md5(md5Hash);
    console.log('The MD5 hash of the tutsplus string is:' + strHash);
    
    var marvelQuery="https://gateway.marvel.com:443/v1/public/comics?format=comic&noVariants=true&titleStartsWith=Spider&limit=5&ts="+ts+"&apikey="+marvelPAPIKey+"&hash="+strHash;
    $.ajax({
        url: marvelQuery,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
    }
    marvelHash();
    
















// Giphy
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key="+giphyAPIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });



