// script.js

let rawgKey = 'b618359b01914cd7acce5ef9812e9759';

let gamesData = [];


// TODO: use form input to get platform IDs, then pass them into the query parameters

    function fetchRawgData(){
        const rawgURL = `https://api.rawg.io/api/games?tags=cross-platform-multiplayer&page=1&page_size=15&ordering=-rating&key=${rawgKey}`

        fetch(rawgURL)
        .then(function(response) {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            $('#listOfGames').innerHTML = '';

            for(let i = 0; i<response['results'].length;i++) {
                $('#listOfGames').append(`
                    <li>
                        <button class="gameButton">
                         ${response['results'][i].name} 
                         </button>
                    </li>`);
            }
            $('.gameButton').on('click', handleButtonClick);
            gamesData = response;
        //    localStorage.setItem('gameInfo', JSON.stringify(response["results"][0]));

        })
        .catch((error) => {
            console.log("Error: " + error);
        })
    }
    
    
    function handleButtonClick(event){
    //    console.log(event.target.innerHTML.trim());
        index = gamesData["results"].findIndex((element) => element.name == event.target.innerHTML.trim())
    //    console.log(index);
        localStorage.setItem('gameInfo', JSON.stringify(gamesData["results"][index]));
        window.location.href = 'gameDetails.html'

    }



    $(document).ready(function(){
        fetchRawgData();

     //   fetchYoutubeData();
    })



