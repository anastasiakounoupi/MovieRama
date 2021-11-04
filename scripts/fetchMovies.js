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
      console.log(data);
    })
  }
}