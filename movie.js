//TMDB

const API_KEY = "ae58d15a-dadb-41a5-85da-954147fdea9d";
let id = 1;
const API_URL_POPULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${id}`;
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')
var totalPages = 100;

getMovies(API_URL_POPULAR);

let lastUrl = '';

//для поиска популярных фильмов
async function getMovies(url) {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });    
    const respData = await resp.json();
    showMovies(respData);
}

//для отображения обложки фильмов
function showMovies(data){
    const moviesEl = document.querySelector(".movies");

    // Очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        // movieEl.classList.add("movie");
        movieEl.innerHTML = `        
        <div class="movie">
        <img src="${movie.posterUrlPreview}" alt="image">

        <div class="movieinfo">
            <h3>${movie.nameRu}</h3>
            <span class="${getColor(movie.rating)}">${movie.rating}</span>
        </div>

        <div class="overview">

            <div class="genre">
                <h2>Жанр: ${movie.genres.map((genre) => `${genre.genre}`)}</h2>
            </div>

            <div class="discription">

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aspernatur sed eligendi atque consectetur nam quos quo repellendus minima dolor!
            </div>

        </div>

    </div>`;
    moviesEl.appendChild(movieEl);

    });

}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

const form = document.querySelector("form");
const search = document.querySelector(".headersearch");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }
});

prev.addEventListener('click', () => {
  pageprev();
})

next.addEventListener('click', () => {
  pagenext();
})

function pagenext(){
  id++;
  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${id}`;
  getMovies(url);
  console.log(url)

}

function pageprev(){
  if(id === 1){
    return 0;
  }
  id--;
  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${id}`;
  getMovies(url);
  console.log(url)

}
