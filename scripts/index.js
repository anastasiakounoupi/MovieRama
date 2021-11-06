import { getMovies, key, baseUrl } from './fetchMovies.js';
import { debounce } from './debounce.js'
import { scrollTop } from './scrollTop.js'

const observeInTheaters = document.querySelector('footer')
const observeSearch = document.querySelector('.button--observe-search')
const input = document.querySelector('input');
const inTheatersButton = document.querySelector('.button--inTheaters')
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

theaterObserver.observe(observeInTheaters);

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
    searchObserver.unobserve(observeSearch)
    return
  } else {
    query = event.target.value
    intersectionCounter = 0;
    observeSearch.classList.remove('visually-hidden')
    theaterObserver.unobserve(observeInTheaters)
    document.querySelector('.movielist').innerHTML = ''
  
    searchObserver.observe(observeSearch);
  }
}

input.addEventListener('input', debounce(onInput, 500) )

inTheatersButton.addEventListener('click', () => {
  document.querySelector('.movielist').innerHTML = ''
  observeSearch.classList.add('visually-hidden')
  input.value = ''
  intersectionCounter = 0;
  theaterObserver.observe(observeInTheaters);
  searchObserver.unobserve(observeSearch);
})