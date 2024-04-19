let currentPage = 1; // Track current page

const movies = {
    apikey: "d4f1dcd6334e5eeba415a8313cbf9bde",
    totalPages: 0,
    fetchMovies: function(name) {
        if (!name) {
            name = "Avengers";
        }
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&query=${name}&page=${currentPage}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            this.totalPages = data.total_pages;
            this.displayMyMovies(data, currentPage); // Pass currentPage here
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
    },
    displayMyMovies: function(data, currentPage) { // Accept currentPage as an argument
        storeMyData = data;
        console.log(storeMyData);
        const gridContainer = document.querySelector(".grid-container");
        console.log("here");
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
        this.updatePaginationButtons();
    },
    nextPage: function() {
        if (currentPage < this.totalPages) {
            currentPage++;
            this.fetchMovies(document.querySelector(".enter-text").value);
        }
    },
    previousPage: function() {
        if (currentPage > 1) {
            currentPage--;
            this.fetchMovies(document.querySelector(".enter-text").value);
        }
    },
    searchFunction: function() {
        currentPage = 1;
        this.fetchMovies(document.querySelector(".enter-text").value);
    },
    updatePaginationButtons: function() {
        const prevButton = document.querySelector(".previous-page-button");
        const nextButton = document.querySelector(".next-page-button");
        if (currentPage === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }
        if (currentPage === this.totalPages) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
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

document.querySelector(".previous-page-button").addEventListener('click', function() {
    movies.previousPage();
});

document.querySelector(".next-page-button").addEventListener('click', function() {
    movies.nextPage();
});

movies.fetchMovies("Avengers");
