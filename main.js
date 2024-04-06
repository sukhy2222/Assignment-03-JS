let storeMyData;
let currentPage = 1; // Track current page

const movies = {
    apikey: "d4f1dcd6334e5eeba415a8313cbf9bde",
    fetchMovies: function(name) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&query=${name}`)
        .then(response => response.json())
        .then(data => this.displayMyMovies(data));
    },
    displayMyMovies: function(data) {
        storeMyData = data;
        const gridContainer = document.querySelector(".grid-container");
        gridContainer.innerHTML = "";
        const startIndex = (currentPage - 1) * 20;
        const endIndex = currentPage * 20;
        for (let i = startIndex; i < endIndex && i < data.results.length; i++) {
            const { title: movieTitle, release_date: movieReleaseDate, adult: isAdult, poster_path: myPicture, vote_average: movieRating } = data.results[i];
            const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
            const posterUrl = posterBaseUrl + myPicture;
            const movieItem = `
                <div class="grid-item">
                    <div>Title: ${movieTitle}</div>
                    <div>Release Date: ${movieReleaseDate}</div>
                    <div>Adult Content: ${isAdult}</div>
                    <div>Rating: ${movieRating}</div>
                    <img src="${posterUrl}" width="200" height="300">
                </div>
            `;
            gridContainer.innerHTML += movieItem;
        }
    },
    nextPage: function() {
        currentPage++;
        this.displayMyMovies(storeMyData);
    },
    searchFunction: function() {
        currentPage = 1;
        this.fetchMovies(document.querySelector(".enter-text").value);
    }
};

document.querySelector(".search-bar button").addEventListener('click', function() {
    movies.searchFunction();
});

document.querySelector(".enter-text").addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        movies.searchFunction();
    }
});

// Add event listener to existing button for pagination
document.querySelector(".next-page-button").addEventListener('click', function() {
    movies.nextPage();
});

// Initial load
movies.fetchMovies("Avengers");
