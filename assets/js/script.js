// script.js

let rawgKey = 'b618359b01914cd7acce5ef9812e9759';

let gamesData = [];

    function handleFormSubmit(event){ // Handles submitting form information
        event.preventDefault();
        $("#myModal").css("display", "none"); // Hide mnodal
        const rawgPlatformsURL = `https://api.rawg.io/api/platforms?key=${rawgKey}` // Generates list of platforms
        fetch(rawgPlatformsURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
        //    console.log(response);
            plat1 = $('#platform1 option:selected').text() // Gets platform 1 from form
            plat2 = $('#platform2 option:selected').text() // Gets platform 2 from form

            index1 = response["results"].findIndex((element) => element.name == plat1); // Finds index of platform 1 in result array
            index2 = response["results"].findIndex((element) => element.name == plat2); // Finds index of platform 2 in result array

            let platformsString = `${response["results"][index1].id}&platforms=${response["results"][index2].id}`; // Gets new string to pass into next fetch URL to filter by platform

            let checked = [];
            $(".check:checked").each(function() { // Creates array of all checked genres
                checked.push($(this).attr('id'));
            });
            let genString = checked.join(", "); // Joins checked genres into 1 string to pass into fetch URL
        //    console.log(genString);
            const rawgURL = `https://api.rawg.io/api/games?tags=cross-platform-multiplayer&platforms=${platformsString}&genres=${genString}&page=1&page_size=15&ordering=-rating&key=${rawgKey}`
            return fetch(rawgURL); // Fetches game data

        })
        .then((response) => {
            return response.json(); // JSON-ifies game data
        })
        .then((response) => {
        //    console.log(response);
            $('#listOfGames').innerHTML = ''; // Clears existing list of data

            for(let i = 0; i<response['results'].length;i++) { // Goes through array of results and appends all game titles to the list
                $('#listOfGames').append(`
                    <li>
                        <button class="gameButton hover:text-blue-500">
                         ${response['results'][i].name} 
                         </button>
                    </li>`);
            }
            $('.gameButton').on('click', handleButtonClick); // Attaches handler to each item
            gamesData = response; // Sets local array to response array

        })
        .catch((error) => {
            console.log("Error: " + error);
            $('#listOfGames').innerHTML = 'Sorry...there was an error fetching the data: ' + error; // Displays error message
        })

    }


    function fetchGenres(){
        let genreURL = `https://api.rawg.io/api/genres?key=${rawgKey}`;
        fetch(genreURL) // Fetches list of genres
        .then((response) => {
            return response.json(); // JSON-ifies genre list
        })
        .then((response) => {
            let i = 0;
        //    console.log(response);
            response["results"].forEach((element) => { // Creates checkbox element in the form for each genre
                $("#genreChecklist").append(`
                    <input type="checkbox" name="genre${i}" value="${element.name}" class="check" id=${element.id}>
                    <label for="genre${i}">${element.name}</label>
                    `);
            })
        })
    }


    
    
    function handleButtonClick(event){
        index = gamesData["results"].findIndex((element) => element.name == event.target.innerHTML.trim()) // Finds index of the object in local array containing appropriate game data
        localStorage.setItem('gameInfo', JSON.stringify(gamesData["results"][index])); // Updates local array to store that data
        window.location.href = 'gameDetails.html' // redirects to details page

    }



    $(document).ready(function(){
     fetchGenres(); // Gets list of genres and adds them into form

     $("#submitButton").on("click", handleFormSubmit); // Attaches handler to form button
    })



