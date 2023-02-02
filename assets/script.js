var giphyAPIKey = giphyAPI;
var marvelAPIKey = marvelAPI; //Private API Key Marvel
var marvelPAPIKey = marvelPAPI; //Public API Key Marvel
var comicSearch = document.getElementById("comic-search");
var comicInput = document.getElementById("comic-input");
var gifSubmit1 = document.getElementById("button1");


// var ts = 0;
// var strHash = 0;

//Marvel

//Marvel API Call structure : http://gateway.marvel.com/v1/public/comics?ts=1&apikey=PublicAPI&hash=md5(ts+privateAPI+PublicAPI) (the hash value is the md5 digest of 1abcd1234)
function marvelSearch(comicName){
  var ts= new Date().getTime();
  console.log("TimeStampe "+ts);
  var md5Hash=ts+marvelAPIKey+marvelPAPIKey;
  console.log("Original MD5 "+ md5Hash);
  var strHash = md5(md5Hash);
  console.log('The MD5 hash of the tutsplus string is:' + strHash);
  var marvelQuery="https://gateway.marvel.com:443/v1/public/comics?format=comic&noVariants=true&titleStartsWith="+comicName+"&limit=5&ts="+ts+"&apikey="+marvelPAPIKey+"&hash="+strHash;
  $.ajax({
      url: marvelQuery,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  }
  // marvelSearch();

// event listener for button click on form following user input
// !variable just means if it's empty
comicSearch.addEventListener("click", validSearch);
function validSearch(e) {
  if (!comicInput) {
    return;
  }else {
    e.preventDefault();
    var comicName = comicInput.value.trim(); // trim() removes only spaces, anything else to be removed, put in ""
    marvelSearch(comicName);
    
  }
  generateGIF(comicName);
}

// create function to pull data we want to display on HTML from the query












// Giphy
// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + giphyAPIKey;

// $.ajax({
//   url: queryURL,
//   method: "GET",
// }).then(function (response) {
//   console.log(response);
// });

// uses comicInput value to generate X GIFs based on the input from the search form
// 
// gifSubmit1.addEventListener("click", generateGIF);
  var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + giphyAPIKey;

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response1) {
  console.log(response1);
  getGIF(response1);
});


// create function to pull data we want to display on HTML from the query
function getGIF(response1) {
  var jiffy = response1.data
  const gifLength = 5;
  for (var i = 0; i < gifLength; i++) {
    $('.card-body').append("<img src='"+jiffy[i].images.original.url+"'/>")
}}
