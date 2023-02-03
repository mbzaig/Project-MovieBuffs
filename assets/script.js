var giphyAPIKey = giphyAPI;
var marvelAPIKey = marvelAPI; //Private API Key Marvel
var marvelPAPIKey = marvelPAPI; //Public API Key Marvel
var comicSearch = document.getElementById("comic-search");
var comicInput = document.getElementById("comic-input");
var gifSubmit1 = document.getElementById("button1");
var getMarvelGiphy = "";

// var ts = 0;
// var strHash = 0;

//Marvel

//Marvel API Call structure : http://gateway.marvel.com/v1/public/comics?ts=1&apikey=PublicAPI&hash=md5(ts+privateAPI+PublicAPI) (the hash value is the md5 digest of 1abcd1234)
function marvelSearch(comicName) {
  var ts = new Date().getTime();
  console.log("TimeStampe " + ts);
  var md5Hash = ts + marvelAPIKey + marvelPAPIKey;
  console.log("Original MD5 " + md5Hash);
  var strHash = md5(md5Hash);
  console.log('The MD5 hash of the tutsplus string is:' + strHash);
  var marvelQuery = "https://gateway.marvel.com:443/v1/public/comics?format=comic&noVariants=true&titleStartsWith=" + comicName + "&limit=4&ts=" + ts + "&apikey=" + marvelPAPIKey + "&hash=" + strHash;
  $.ajax({
    url: marvelQuery,
    method: "GET"
  }).then(function (marvelResponse) {
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
  } else {
    e.preventDefault();
    var comicName = comicInput.value.replace(/ /g, "+");; // trim() removes only spaces, anything else to be removed, put in ""
    console.log(comicName);
    marvelSearch(comicName);
    generateGIF(comicName);

  }

}

function displayMarvel(marvelResponse) {
  console.log("displayMarvelcAlled")
  var marvelData = marvelResponse.data;
if (marvelData.results!=""){
  // console.log(marvelData.results[0].images[0].path+imageExtension);
  for (var z = 0; z < marvelData.results.length; z++) {

    var imageExtension = "." + marvelData.results[z].images[0].extension;
    console.log("Marvel response=" + marvelData.results[z].images[0].path + imageExtension);

    $('.marvelCard').append("<img src=" + marvelData.results[z].images[0].path + imageExtension + ">")
    var marvelTitle = marvelData.results[z].title;
    console.log(marvelTitle);
    getMarvelGiphy = marvelTitle;


  }
}
  else {
    alert("No Comic found with this name, enjoy some GIFs instead");
  }

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



function generateGIF(comicName) {

  var giphySearch = comicName + "+comic"
  console.log("comicNAMe " + "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + giphySearch + "&limit=4&offset=0&rating=g&lang=en")

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + giphySearch + "&limit=4&offset=0&rating=g&lang=en";
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

  for (var i = 0; i < jiffy.length; i++) {


    $('.giphyCard').append("<img src=" + jiffy[i].images.original.url + "/>")
  }
}
