import { getMovies, key, baseUrl } from './fetchMovies.js';
import { debounce } from './debounce.js'
import { scrollTop } from './scrollTop.js'
// import { showMoviePopup } from './moviePopup.js';

const footer = document.querySelector('footer')
const input = document.querySelector('input');
const inTheatersButton = document.querySelector('.button--inTheaters')
// const movies = document.querySelectorAll('.movie')
// console.log(movies)
let query = ''

scrollTop()

let intersectionCounter = 0;

const options = {
  root: null,
  rootMargin: "0px",
  threshold: .5
};

export const theaterObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      intersectionCounter++
      const apiUrl = `${baseUrl}movie/now_playing${key}&page=${intersectionCounter}`;

      getMovies(apiUrl)
    }

  });
}, options);

theaterObserver.observe(footer);

const searchObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      intersectionCounter++
      const apiUrl = `${baseUrl}search/movie${key}&query=${query}&page=${intersectionCounter}`;

      getMovies(apiUrl)
    }

  });
}, options);

const onInput = (event) => {
  if (event.target.value === '') {
    intersectionCounter = 0;
    document.querySelector('.movielist').innerHTML = ''
    searchObserver.unobserve(footer)
    return
  } else {
    query = event.target.value
    intersectionCounter = 0;
    theaterObserver.unobserve(footer)
    document.querySelector('.movielist').innerHTML = ''

    searchObserver.observe(footer);
  }
}

input.addEventListener('input', debounce(onInput, 500) )

inTheatersButton.addEventListener('click', () => {
  document.querySelector('.movielist').innerHTML = ''
  input.value = ''
  intersectionCounter = 0;
  theaterObserver.observe(footer);
  searchObserver.unobserve(footer);
})

// movies.forEach(movie => {
//   movie.addEventListener('click', showMoviePopup)
// })