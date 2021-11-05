export class FetchMovies {
  constructor(apiUrl) {
    this.key = '?api_key=bc50218d91157b1ba4f142ef7baaa6a0';
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiUrl = `${this.baseUrl}${apiUrl}${this.key}`;

    this.getMovies(this.apiUrl)
  }

  getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        this.showMovies(data.results)
    })
  }

  showMovies(data) {
    const movieList = document.querySelector('.movielist')
    const imageUrl = 'https://image.tmdb.org/t/p/w500'
    movieList.innerHTML = '';

    data.forEach(movie => {
      const { title, poster_path, release_date, vote_average, overview } = movie;

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
            <p class="movie__details--genre">genre</p>
            <p class="movie__details--vote">${vote_average}</p>
          </div>
          <p class="movie__details--desc">${overview}</p>
        </div>
      </div>
      
      `;

      movieList.appendChild(movieEl)
    })
  }
}