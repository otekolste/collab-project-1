// script.js

let rawgKey = 'b618359b01914cd7acce5ef9812e9759';

let gamesData = [];

    function handleFormSubmit(event){
        event.preventDefault();
        $("#myModal").css("display", "none");
        const rawgPlatformsURL = `https://api.rawg.io/api/platforms?key=${rawgKey}`
        fetch(rawgPlatformsURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            plat1 = $('#platform1 option:selected').text()
            plat2 = $('#platform2 option:selected').text()
            console.log(plat1);

            console.log(response["results"]);

            index1 = response["results"].findIndex((element) => element.name == plat1);
            index2 = response["results"].findIndex((element) => element.name == plat2);

            let platformsString = `${response["results"][index1].id}, ${response["results"][index2].id}`;
            
            const rawgURL = `https://api.rawg.io/api/games?tags=cross-platform-multiplayer&platforms=${platformsString}&page=1&page_size=15&ordering=-rating&key=${rawgKey}`
            return fetch(rawgURL);

        })
        .then((response) => {
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
            $('#listOfGames').innerHTML = 'Sorry...there was an error fetching the data!';
        })

    }

// TODO: use form input to get platform IDs, then pass them into the query parameters

    function fetchRawgData(){

    }
    
    
    function handleButtonClick(event){
    //    console.log(event.target.innerHTML.trim());
        index = gamesData["results"].findIndex((element) => element.name == event.target.innerHTML.trim())
    //    console.log(index);
        localStorage.setItem('gameInfo', JSON.stringify(gamesData["results"][index]));
        window.location.href = 'gameDetails.html'

    }



    $(document).ready(function(){
     //   fetchRawgData();
     // handleFormSubmit();

     //   fetchYoutubeData();

     $("#submitButton").on("click", handleFormSubmit);
    })



