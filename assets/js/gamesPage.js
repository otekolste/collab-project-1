let ytKey = 'AIzaSyDqk5LsbYpP5Z463Q5A4mXxZdPIlhytH-8';

let rawgKey = 'b618359b01914cd7acce5ef9812e9759';

let player = $('#player');

let info = [];

let wishlist = [];

let videoId = '';



function renderGameDetails(){
    if(info == null) { // Checks if local array is null
        $('#gameTitle').innerHTML = "Whoops...there was an issue loading the info!" // Displays error message if nothing is found
    }
    else{
      console.log(info);
        $('#gameTitle').text(info.name); // Display title

        let genString = info.genres.map((gen) => `${gen.name}`).join(", "); // String-ifies list of genres

        // Appends rating and genre info
        $('#infoContainer').innerHTML = '';
        $('#infoContainer').append(`
          <h1 class="text-xl my-2">Rating: ${info.rating}</h1>
          <h1 class="text-xl my-2">Genres: ${genString}</h1>

        `);

        fetchYoutubeData(); // Searches + embeds video player


    }
}

// Code referenced from: https://developers.google.com/youtube/iframe_api_reference

function fetchYoutubeData(){
    let searchString = (info.name.replaceAll(' ','+')).concat('+trailer'); // Creates a fetch request based on title of game + the word trailer
    const ytURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchString}&maxResults=1&type=video&videoEmbeddable=true&key=${ytKey}`
    fetch(ytURL)
    .then((response) => {
        return response.json(); // converts response to JSON

    })
    .then((response) => { 
        console.log(response);
      // This code loads the IFrame Player API code asynchronously.

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        videoId = response["items"][0]["id"].videoId;

    })
    
    .catch((error) => {
        console.log("Error fetching YT data: " + error)
        $("#errorMessage").innerHTML('There was an error embedding the YouTube video player.');
    })
}

      // This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

      // The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      //  The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

      // Function to add a game to wishlist
      function handleAddWishlist(event) {
        event.preventDefault();
     //   console.log(wishlist);
        const game = wishlist.find(function(element) { // Checks if game is already in wishlist
          return element.id == info.id;
        });
        if(!game) {
          wishlist.push(info); // Adds array of game data to wishlist
          localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Updates local storage array 
        }

        window.location.href = 'wishlist.html'; // Redirects to wishlist page


      }

$(document).ready(function(){

    info = JSON.parse(localStorage.getItem('gameInfo')); // Retrieves game info from local storage


    let storedList = JSON.parse(localStorage.getItem('wishlist')); // Retrieves wishlist info from local storage

    if(storedList!=null) { // Check if any data exists, and if it does, assigns to local storage
      wishlist = storedList;
    }

    renderGameDetails(); // Displays game details

    $('#wishlistButton').on('click', handleAddWishlist);
 //   fetchYoutubeData();
})