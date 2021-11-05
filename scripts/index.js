// import { FetchMovies } from "./fetchMovies.js";
import { getMovies } from "./inTheaters.js";

const scrollTopBtn = document.querySelector('.button--scroll-top');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})

getMovies()
