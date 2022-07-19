// TMDB

var API_KEY = "api_key=01c09651636453d932a88c8d279f48a9";
const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&language=fa&" + API_KEY;
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data);
        showMovies(data.results);
    })
}
function showMovies(data) {
    console.log(data);
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>

                <div class="overview">
                     <h3>Overview</h3>
                        ${overview}
                </div>
            </div>
        `
        main.appendChild(movieEl);
    });

}

function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}


getMovies(API_URL);


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    // console.log(searchTerm);
    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
        console.log(data);

    }
    else {
        getMovies(API_URL);
    }

})