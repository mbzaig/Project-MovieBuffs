var giphyAPIKey = giphyAPI;
var marvelAPIKey = marvelAPI; //Private API Key Marvel
var marvelPAPIKey = marvelPAPI; //Public API Key Marvel
var comicSearch = document.getElementById("comic-search");
var comicInput = document.getElementById("comic-input");
var gifSubmit1 = document.getElementById("button1");
var getMarvelGiphy = "";
var searchedComic = "";
var clearHistory = document.getElementById("clearBtn");

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

//**********This Piece of code is not currently working need to speak with sandy */
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



comicSearch.addEventListener("click", validSearch);

// function validSearch(event) {
//   event.preventDefault();
//   if (!comicInput) {
//     return;
//   } else {
//     var comicName = comicInput.value.replace(/ /g, "+");; // trim() removes only spaces, anything else to be removed, put in ""
//     console.log(comicName);

//     searchedComic = comicInput.value;
//     marvelSearch(comicName);
//     generateGIF(comicName);

//   }

// }

function validSearch(e) {
  console.log(comicInput.value);
  //event.preventDefault();
  if (!comicInput.value) {
    return;
  } else {
    e.preventDefault();
    var comicName = comicInput.value.replace(/ /g, "+");; // trim() removes only spaces, anything else to be removed, put in ""
    console.log(comicName);
    
    searchedComic = comicInput.value;
    marvelSearch(comicName);
    generateGIF(comicName);
  }
}
function validSearch1() {
  console.log(comicInput.value);
  //event.preventDefault();
  if (!comicInput.value) {
    return;
  } else {
    
    var comicName = comicInput.value.replace(/ /g, "+");; // trim() removes only spaces, anything else to be removed, put in ""
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
  $('.comics-container').empty();
  if (marvelData.results != "") {
    for (var z = 0; z < marvelData.results.length; z++) {
      
      var imageExtension = "." + marvelData.results[z].images[0].extension;
      console.log("Marvel response=" + marvelData.results[z].images[0].path + imageExtension);
      $('.comics-container').append("<img src=" + marvelData.results[z].images[0].path + imageExtension + ">")
      var marvelTitle = marvelData.results[z].title;
      console.log(marvelTitle);
      getMarvelGiphy = marvelTitle;

    }
    saveHistory();
    //fetch(finalQuery);
  }
}



let buttonsLength = 0;

function saveHistory() {

  while (document.getElementById("leftBtn").innerHTML != searchedComic && document.getElementById("middleBtn").innerHTML != searchedComic && document.getElementById("rightBtn").innerHTML != searchedComic) {
    if (buttonsLength < 3) {
      buttonsLength++;

    }
    else {
      buttonsLength = 0;

    }



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
for (i = 0; i < 3; i++) {
  document.getElementById("leftBtn").innerText = (localStorage.getItem("0"));

  document.getElementById("middleBtn").innerText = (localStorage.getItem("1"));
  document.getElementById("rightBtn").innerText = (localStorage.getItem("2"));
}

clearHistory.addEventListener("click", clearLocal);

function clearLocal() {
  window.localStorage.clear();
  location.reload();

}


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
// function getGIF(giphyResponse) {
//   var jiffy = giphyResponse.data;

//   for (var i = 0; i < jiffy.length; i++) {


//     $('.giphyCard').append("<img src=" + jiffy[i].images.original.url + "/>")
//   }
// }
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