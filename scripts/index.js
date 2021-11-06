import { getMovies, theaterObserver, key, baseUrl } from "./inTheaters.js";

const scrollTopBtn = document.querySelector('.button--scroll-top');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})

const loadBtn = document.getElementById('load')

theaterObserver.observe(loadBtn);

const input = document.querySelector('input');

input.addEventListener('input', (event) => {
  theaterObserver.unobserve(loadBtn)
  document.querySelector('.movielist').innerHTML = ''
}, {once: true})

input.addEventListener('input', (event) => {
  document.querySelector('.movielist').innerHTML = ''
  const searchUrl = `${baseUrl}search/movie/${key}&query=${event.target.value}`;
  getMovies(searchUrl)
})