import { showMovieDetails } from "./moviePopup.js";
import { debounce } from "./debounce.js";

export const key = '?api_key=bc50218d91157b1ba4f142ef7baaa6a0';
export const baseUrl = 'https://api.themoviedb.org/3/';
const genreUrl = `${baseUrl}genre/movie/list${key}`;

const getGenres = async () => {
  try{
    const response = await fetch(genreUrl)
    const { genres } = await response.json()
    return genres;
  } catch (err) {
    throw new Error(err)
  }
}

const genreList = await getGenres()

export const getMovies = async (url) => {
  try {
    const response = await fetch(url)
    const movies = await response.json()
    showMovies(movies.results)
  } catch (err) {
    throw new Error(err)
  }
}

const showMovies = (data) => {
  const movieList = document.querySelector('.movielist')
  const imageUrl = 'https://image.tmdb.org/t/p/w500'

  data.forEach(movie => {
    const { id, title, poster_path, release_date, vote_average, overview, genre_ids } = movie;
    let genres = [];

    genreList.forEach(genre => {
      genre_ids.includes(genre.id) ? genres.push(genre.name) : ""
    })

    const movieEl = document.createElement('article');
    movieEl.classList.add('movie');
    movieEl.addEventListener('click', debounce(showMovieDetails, 500))
    movieEl.innerHTML = `
      <a href="#movie-popup=${id}">
      <div class="movie__side movie__side--front">
        <img src="${imageUrl}${poster_path}" alt="${title}" loading="lazy" width="250" class="movie__image">
        <h3 class="movie__details--title">${title}</h3>
      </div>
      <div class="movie__side movie__side--back">
        <div class="movie__details">
          <div class="movie__details--info">
            <p class="movie__details--release">Year ${release_date.split('-')[0]}</p>
            <p class="movie__details--vote">Average vote ${vote_average}</p>
            <p class="movie__details--genre">${genres.join(', ')}</p>
          </div>
          <p class="movie__details--desc">${overview}</p>
        </div>
      </div>
      </a>
    `;

    movieList.appendChild(movieEl)
  })
}
