export class FetchMovies {
  constructor(apiUrl) {
    this.key = '?api_key=bc50218d91157b1ba4f142ef7baaa6a0';
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiUrl = `${this.baseUrl}${apiUrl}${this.key}`;

    this.getMovies(this.apiUrl)
  }

  getMovies(url) {
    fetch(url)
      .then(res => res.json)
      .then(data => {
        this.showMovies(data.results)
    })
  }

  showMovies(data) {
    const movieList = document.querySelector('movielist')

    data.forEach(movie => {
      const movieEl = document.createElement('article');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
      <img src="assets/images/small.jpg" alt="Movie" width="250" class="movie__image">
      <div class="movie__details">
        <h3 class="movie__details--title">Movie Title</h3>
        <div class="movie__details--info">
          <p class="movie__details--release">Year</p>
          <p class="movie__details--genre">genre</p>
          <p class="movie__details--vote">vote</p>
        </div>
        <p class="movie__details--desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.
           Nobis ex velit quas repellat inventore dolorum magni delectus ab possimus quidem?</p>
        <span class="movie__details--more"><i class="fas fa-angle-right"></i></span>
      </div>
      `;

      movieList.appendChild(movie)
    })
  }
}