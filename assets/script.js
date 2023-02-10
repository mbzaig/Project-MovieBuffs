//*********Global Variable************ */


var giphyAPIKey = "7fhKbiyRgbd7pXAYUqhpLN5KmQQjxwwf";//giphyAPI;
var marvelAPIKey ="6e4b0cf1b266a8c740eb503b2024bac833e8c71e";// marvelAPI; //Private API Key Marvel
var marvelPAPIKey = "aed3b2c4b9d8430e2d035517f52ae62c";//marvelPAPI; //Public API Key Marvel
var comicSearch = document.getElementById("comic-search");
var comicInput = document.getElementById("comic-input");
var searchedComic = "";
var clearHistory = document.getElementById("clearBtn");

// var sound = document.getElementById("soundbite");

// function autoNotify() {
//   sound.play(); //https://developer.chrome.com/blog/autoplay/ this is why it doesn't like this specific piece
// }


// event listener for page loading
// function autoNotify() {

// document.addEventListener('DOMContentLoaded', function() {
//   var soundbite = document.getElementById("soundbite");
//   soundbite.loop = true;
// })};


//****************Marvel-Section************

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


// event listener for button click from history
$("#leftBtn").on("click", function () {
  comicInput.value = localStorage.getItem("0");
  //console.log(localStorage.getItem("0"));
  validSearch1(comicInput.value);
});

$("#middleBtn").on("click", function () {
  comicInput.value = localStorage.getItem("1");
  //console.log(localStorage.getItem("1"));
  validSearch1(comicInput.value);
});


$("#rightBtn").on("click", function () {
  comicInput.value = localStorage.getItem("2");
  //console.log(localStorage.getItem("2"));
  validSearch1(comicInput.value);
});

// event listener for button click on form following user input
comicSearch.addEventListener("click", validSearch);
// !variable just means if it's empty
function validSearch(e) {
  console.log(comicInput.value);
  //event.preventDefault();
  if (!comicInput.value) {
    return;
  } else {
    e.preventDefault(); // Need prevent default, otherwise the page keeps refreshing when you hit search.
    var comicName = comicInput.value.replace(/ /g, "+");; // this piece of code replaced blank space with a +
    console.log(comicName);
    searchedComic = comicInput.value;
    marvelSearch(comicName);
    generateGIF(comicName);
  }
}
function validSearch1() {
  console.log(comicInput.value);
  //event.preventDefault(); search does not work with prevent default
  if (!comicInput.value) {
    return;
  } else {

    var comicName = comicInput.value.replace(/ /g, "+");;
    console.log(comicName);

    searchedComic = comicInput.value;
    marvelSearch(comicName);
    generateGIF(comicName);
  }
}

// create function to pull data we want to display on HTML from the query

function displayMarvel(marvelResponse) {
  // console.log("displayMarvelcAlled")
  var marvelData = marvelResponse.data;
  let myModal = new bootstrap.Modal(document.getElementById('marvelModal'), {});
  let myModalText = "";
  $('.comics-container').empty();//Empties out the container for new results
  if (marvelData.results != "") {// checks if the marvel results are not empty
    for (var z = 0; z < marvelData.results.length; z++) {
      if (marvelData.results[z].images != "") {// checks that the marvel comic has images associated with the title

        var imageExtension = "." + marvelData.results[z].images[0].extension;

        console.log("Marvel response=" + marvelData.results[z].images[0].path + imageExtension);
        $('.comics-container').append("<img src=" + marvelData.results[z].images[0].path + imageExtension + ">")
        var marvelTitle = marvelData.results[z].title;
        console.log(marvelTitle);
        getMarvelGiphy = marvelTitle;

      }
      else {//If an image is not associated with a result shows the modal with below message

        myModalText = "Sorry the Comic you searched does not have 1 or more images ...You can still enjoy some funny Gifs";
        document.getElementById("modalText").innerHTML = myModalText;
        myModal.show();
      }
    }
    saveHistory();

  }
  else {// if a comic is not found then shows a modal with below message   
    myModalText = "Sorry the Comic you searched for is not in Marvel Database...You can still enjoy some funny Gifs";
    document.getElementById("modalText").innerHTML = myModalText;
    myModal.show();

  }
}

let buttonsLength = 0;

function saveHistory() {
  // Only adds a search term to local storage if it is not already existent in the storage
  while (document.getElementById("leftBtn").innerHTML != searchedComic && document.getElementById("middleBtn").innerHTML != searchedComic && document.getElementById("rightBtn").innerHTML != searchedComic) {
    if (buttonsLength < 3) {
      buttonsLength++;

    }
    else {
      buttonsLength = 0;

    }


    // switch statement to store in local storage
    switch (buttonsLength) {
      case 0:
        document.getElementById("leftBtn").innerHTML = searchedComic;
        localStorage.setItem("0", searchedComic)

        break;
      case 1:
        localStorage.setItem("1", searchedComic)
        document.getElementById("middleBtn").innerHTML = searchedComic;
        break;
      case 2:
        localStorage.setItem("2", searchedComic)
        document.getElementById("rightBtn").innerHTML = searchedComic;
        break;
      default:
        break;
    }
  }
};

// gets item from local storage and displays it on the button
for (i = 0; i < 3; i++) {
  document.getElementById("leftBtn").innerText = (localStorage.getItem("0"));
  document.getElementById("middleBtn").innerText = (localStorage.getItem("1"));
  document.getElementById("rightBtn").innerText = (localStorage.getItem("2"));
}
// when clear history button is clicked, the function removes everything from local storage and reloads the page
clearHistory.addEventListener("click", clearLocal);

function clearLocal() {
  window.localStorage.clear();
  location.reload();
}

// ****************Giphy Section**************

function generateGIF(comicName) {
  // API Call for generating GIF
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

// Function for displaying gif response.
function getGIF(giphyResponse) {
  var jiffy = giphyResponse.data;
  $('.giphyCards').empty();
  for (var i = 0; i < jiffy.length; i++) {
    var gifCard = `
      <div class="card" style="width: 18rem;">
        <img src="${jiffy[i].images.original.url}" class="card-img-top" alt="GIF">
        <div class="card-body">
          <p class="card-text">${jiffy[i].title}</p>
        </div>
      </div>
    `;

    $('.giphyCards').append(gifCard);
  }
}