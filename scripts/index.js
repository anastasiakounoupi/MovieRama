import { getMovies, key, baseUrl } from './fetchMovies.js';
import { debounce } from './debounce.js'
import { scrollTop } from './scrollTop.js'

const observeInTheaters = document.querySelector('.button--observe-inTheaters')
const observeSearch = document.querySelector('.button--observe-search')
const input = document.querySelector('input');
const inTheatersButton = document.querySelector('.button--inTheaters')

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

theaterObserver.observe(observeInTheaters);

const onInput = (event) => {
  if (!input.value) {
    document.querySelector('.movielist').innerHTML = ''

    return
  }
  let intersectionCounter = 1;
  getMovies(`${baseUrl}search/movie/${key}&query=${event.target.value}&page=${intersectionCounter}`)

  theaterObserver.unobserve(observeInTheaters)
  document.querySelector('.movielist').innerHTML = ''
  const searchObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intersectionCounter++
        const apiUrl = `${baseUrl}search/movie/${key}&query=${event.target.value}&page=${intersectionCounter}`;
  
        getMovies(apiUrl)
      }
  
    });
  }, options);

  searchObserver.observe(observeSearch);
}

input.addEventListener('input', debounce(onInput, 500) )

inTheatersButton.addEventListener('click', () => {
  document.querySelector('.movielist').innerHTML = ''
  input.value = ''
  intersectionCounter = 0;
  theaterObserver.observe(observeInTheaters);
})