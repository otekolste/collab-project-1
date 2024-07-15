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

            index1 = response["results"].findIndex((element) => element.name == plat1);
            index2 = response["results"].findIndex((element) => element.name == plat2);

            let platformsString = `${response["results"][index1].id}&platforms=${response["results"][index2].id}`;

            let checked = [];
            $(".check:checked").each(function() {
                checked.push($(this).attr('id'));
            });
            let genString = checked.join(", ");
            console.log(genString);
            const rawgURL = `https://api.rawg.io/api/games?tags=cross-platform-multiplayer&platforms=${platformsString}&genres=${genString}&page=1&page_size=15&ordering=-rating&key=${rawgKey}`
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
            $('#listOfGames').innerHTML = 'Sorry...there was an error fetching the data: ' + error;
        })

    }


    function fetchGenres(){
        let genreURL = `https://api.rawg.io/api/genres?key=${rawgKey}`;
        fetch(genreURL)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let i = 0;
            console.log(response);
            response["results"].forEach((element) => {
                $("#genreChecklist").append(`
                    <input type="checkbox" name="genre${i}" value="${element.name}" class="check" id=${element.id}>
                    <label for="genre${i}">${element.name}</label>
                    `);
            })
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
     fetchGenres();

     $("#submitButton").on("click", handleFormSubmit);
    })



