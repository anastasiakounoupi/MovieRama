import { FetchMovies } from "./fetchMovies.js";

const inTheatersList = new FetchMovies('movie/now_playing')
// const movieList = new FetchMovies('genre/movie/list')

const scrollTopBtn = document.querySelector('.button--scroll-top');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})