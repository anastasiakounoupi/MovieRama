import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js'

export const similarMoviesSlider = () => {
  new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay: {
      delay: 3500,
      stopOnLastSlide: false,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 5.3,
        spaceBetween: 10
      }
    }
  })
}
