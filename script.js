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
const tagsEl = document.getElementById("tags");

const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];


var selectedGenre = [];
setGeneres();

function highLightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove("high-light");
    })
    clearButton();
    if (selectedGenre != 0) {

        selectedGenre.forEach(id => {
            const highLightedTag = document.getElementById(id);
            highLightedTag.classList.add("high-light")
        })
    }
}
function setGeneres() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement("div");
        t.classList.add('tag');
        t.id = genre.id;
        t.textContent = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    });
                } else {
                    selectedGenre.push(genre.id);
                }

            }
            console.log(selectedGenre);
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
            highLightSelection();
        })
        tagsEl.appendChild(t);
    })

}

// TODO: Change the name and method it's work
function clearButton() {
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        clearBtn.classList.add('high-light');
    } else {

        let clear = document.createElement('div');
        clear.classList.add('tag', 'high-light');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGeneres();
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }
}
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data);
        if (data.results.length != 0) {
            showMovies(data.results);
        } else {
            main.innerHTML = `<h1 class="no-result">No Results found</h1>`
        }

    })
}
function showMovies(data) {
    // console.log(data);
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${poster_path ? IMG_URL + poster_path : './images/mason-kimbarovsky-unsplash.jpg'}" alt="${title}">
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
    selectedGenre = [];
    setGeneres();
    // console.log(searchTerm);
    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
        console.log(data);

    }
    else {
        getMovies(API_URL);
    }

})