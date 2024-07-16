let wishlist = [];

function renderWishlist() {
    if(wishlist==null) {
        $("#wishlist").innerHTML = 'Sorry...an error occured displaying your wishlist.'; // Displays error message
    }
    $("#wishlist").innerHTML = ''; // Clears existing HTML, so no duplicates

    wishlist.forEach((game) => { // Iterates through wishlist and creates a card for each game
        $("#wishlist").append(`
            <div class="max-w-sm rounded overflow-hidden shadow-lg mx-2">
                <img class="w-full" src="${game.background_image}" alt="Background image for ${game.name}">
                <h3 class="uppercase font-bold text-xl py-2">${game.name}</h3>
            </div>
            `)
    })

}

$(document).ready(function() {

    wishlist = JSON.parse(localStorage.getItem('wishlist')); // Retrieves wishlist data

    renderWishlist(); // Renders wishlist

});
