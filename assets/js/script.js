// script.js

let rawgKey = 'b618359b01914cd7acce5ef9812e9759';

/*
//document.addEventListener('DOMContentLoaded', function() {
 //   const youtubeApiKey =   
    const igdbApiKey =  'ijhnqf2cq2uab1iyyrrqykta1sd29n';

    // Function to fetch data and update the DOM
    function fetchData(url, containerId, transformData, errorMessage) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = ''; // Clear previous content
                    transformData(data).forEach(item => {
                        const newItem = document.createElement('div');
                        newItem.classList.add('item');
                        newItem.innerHTML = item;
                        container.appendChild(newItem);
                    });
                } else {
                    console.error(`Container with id "${containerId}" not found`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = `<p>${errorMessage}</p>`;
                }
            });
    }

    // Fetch data from YouTube API
    function fetchYouTubeData() {
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=gaming&type=video&key=${youtubeApiKey}`;
        fetchData(youtubeApiUrl, 'youtubeContainer', data => {
            return data.items.map(item => {
                const title = item.snippet.title;
                const description = item.snippet.description;
                const thumbnail = item.snippet.thumbnails.high.url;
                const videoId = item.id.videoId;
                return `<div>
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                                <img src="${thumbnail}" alt="${title}">
                            </a>
                        </div>`;
            });
        }, 'Sorry, something went wrong with YouTube API.');
    }

    // Fetch data from IGDB API
    function fetchIGDBData() {
        const igdbApiUrl = 'https://api.igdb.com/v4/games';
        fetch(igdbApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${igdbApiKey}`,
                'Client-ID': '5srdgcaqlr4evofnffltz551hkuswp',
                'Content-Type': 'text/plain'
            },
            body: 'fields name,summary,cover.url, platform; where game.platforms = 48; limit 5;'  
        })
        .then(response => {
            console.log(response.json());
            return response.json();
        })
        /*
        .then(data => {
            const container = document.getElementById('igdbContainer');
            if (container) {
                container.innerHTML = ''; 
                data.forEach(item => {
                    const title = item.name;
                    const description = item.summary || 'No Description';
                    const coverUrl = item.cover ? item.cover.url.replace('t_thumb', 't_cover_big') : 'https://via.placeholder.com/300x400?text=No+Cover';
                    container.innerHTML += `<div>
                                                <h3>${title}</h3>
                                                <p>${description}</p>
                                                <img src="${coverUrl}" alt="${title}">
                                            </div>`;
                });
            } else {
                console.error(`Container with id "igdbContainer" not found`);
            }
        })
            

    }

*/

// TODO: use form input to get platform IDs, then pass them into the query parameters

    function fetchRawgData(){
        const rawgURL = `https://api.rawg.io/api/games?tags=cross-platform-multiplayer&page=1&page_size=15&ordering=-rating&key=${rawgKey}`

        fetch(rawgURL)
        .then(function(response) {
            return response.json();
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log("Error: " + error);
        })
    }

    $(document).ready(function(){
        $("#formButton").click(fetchRawgData());
    })



