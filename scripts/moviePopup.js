import { key, baseUrl } from './fetchMovies.js'
import { similarMoviesSlider } from './sliders.js'

const popup = document.querySelector('.popup')
const popupContent = document.querySelector('.popup__content')
const popupVideoContent = document.querySelector('.popup__content-video')
const popupReviewContent = document.querySelector('.popup__content-reviews')
const popupSimilarContent = document.querySelector('.popup__content-similar')
const imageUrl = 'https://image.tmdb.org/t/p/w500'

export const showMovieDetails = async () => {
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('=') + 1);
  const detailsUrl = `${baseUrl}/movie/${id}${key}`;
  const videoUrl = `${baseUrl}/movie/${id}/videos${key}`;
  const reviewsUrl = `${baseUrl}/movie/${id}/reviews${key}`;
  const similarUrl = `${baseUrl}/movie/${id}/similar${key}`;
  const urls = [detailsUrl, videoUrl, reviewsUrl, similarUrl];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url)))
    const data = await Promise.all(responses.map(res => res.json()))
    showMoviePopup(data)
  } catch (err) {
    throw new Error(err)
  }
}

export const showMoviePopup = (data) => {
  const { id, title} = data[0];
  popup.setAttribute("id", `movie-popup=${id}`)

  const video = data[1].results[0]?.key
  if(video) {
    popupVideoContent.innerHTML = `
    <iframe width="700" height="300" controls=0 frameBorder=0
      src="https://www.youtube.com/embed/${video}">
    </iframe>
  `;
  }
  
  const reviews = data[2].results.slice(0, 2)
  if(reviews.length) {
    const container =document.createElement('div')
    container.classList.add('popup__content-reviews-container')

    popupReviewContent.innerHTML = '<h1 class="title-primary">REVIEWS</h1>'
    reviews.map(review => {
      const { author, content } = review 
      container.innerHTML += `
        <div class="popup__content-reviews-item">
          <h3>${author}</h3>
          <p>${content}</p>
        </div>
      `
    })
    popupReviewContent.appendChild(container)
  }
  
  const similarMovies = data[3].results
  if(similarMovies.length) {
    const container =document.createElement('div')
    container.classList.add('popup__content-similar-container', 'swiper-wrapper')

    popupSimilarContent.innerHTML = '<h1 class="title-primary">SIMILAR MOVIES</h1>'
    similarMovies.map(movie => {
      const { title, poster_path } = movie
      container.innerHTML += `
        <div class="popup__content-similar-item swiper-slide">
          <img src="${imageUrl}${poster_path}" alt="${title}" loading="lazy" width="100" class="movie__image">
          <p>${title}</p>
        </div>
      `
    })
    popupSimilarContent.appendChild(container)
  }
  
  popup.style.visibility = 'visible'
  popup.style.opacity = '1'
  popupContent.style.visibility = 'visible'
  popupContent.style.opacity = '1'
  popupContent.style.transform = 'translate(-50%, -50%) scale(1)'

  similarMoviesSlider()

  document.body.addEventListener('click', () => {
    popupContent.style.transform = 'translate(-50%, -50%) scale(.25)'
    popup.style.visibility = 'hidden'
    popup.style.opacity = '0'
    popupContent.style.visibility = 'hidden'
    popupContent.style.opacity = '0'
    popupVideoContent.innerHTML = ''
    popupReviewContent.innerHTML = ''
    popupSimilarContent.innerHTML = ''
  })
}