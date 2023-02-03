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
    }).then(function(marvelResponse) {
      console.log(marvelResponse);
      displayMarvel(marvelResponse);
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
    var comicName = comicInput.value.replace(/ /g,"+");; // trim() removes only spaces, anything else to be removed, put in ""
    console.log(comicName);
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
  
  
 
function generateGIF(comicName){

  var giphySearch= comicName+"+comic"
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+giphyAPIKey+"&q="+giphySearch+"spider+man+comics&limit=4&offset=0&rating=g&lang=en" ;
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (giphyResponse) {
  console.log(giphyResponse);
  getGIF(giphyResponse);
});
}

// create function to pull data we want to display on HTML from the query
function getGIF(giphyResponse) {
  var jiffy = giphyResponse.data;
  console.log("Giphy Response data "+jiffy);
  const gifLength = jiffy.length;
  console.log("response lenght"+gifLength);

  for (var i = 0; i < gifLength; i++) {


    $('.giphyCard').append("<img src="+jiffy[i].images.original.url+"/>")
}}
