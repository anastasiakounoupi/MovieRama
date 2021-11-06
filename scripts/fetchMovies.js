export const key = '?api_key=bc50218d91157b1ba4f142ef7baaa6a0';
export const baseUrl = 'https://api.themoviedb.org/3/';
const genreUrl = `${baseUrl}genre/movie/list${key}`;

const getGenres = async () => {
  try{
    const response = await fetch(genreUrl)
    const { genres } = await response.json()
    return genres;
  } catch {
    throw new Error ('Something went wrong')
  }
}

const genreList = await getGenres()

export const getMovies = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl)
    const movies = await response.json()
    showMovies(movies.results)
  } catch (err) {
    throw new Error ('Something went wrong')
  }
}

const showMovies = (data) => {
  const movieList = document.querySelector('.movielist')
  const imageUrl = 'https://image.tmdb.org/t/p/w500'

  data.forEach(movie => {
    const { title, poster_path, release_date, vote_average, overview, genre_ids } = movie;
    let genres = [];

    genreList.forEach(genre => {
      genre_ids.includes(genre.id) ? genres.push(genre.name) : ""
    })

    const movieEl = document.createElement('article');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <div class="movie__side movie__side--front">
        <img src="${imageUrl}${poster_path}" alt="${title}" width="250" class="movie__image">
        <h3 class="movie__details--title">${title}</h3>
      </div>
      <div class="movie__side movie__side--back">
        <div class="movie__details">
          <div class="movie__details--info">
            <p class="movie__details--release">${release_date}</p>
            <p class="movie__details--genre">${genres.join(', ')}</p>
            <p class="movie__details--vote">${vote_average}</p>
          </div>
          <p class="movie__details--desc">${overview}</p>
        </div>
      </div>
    `;

    movieList.appendChild(movieEl)
  })
}
