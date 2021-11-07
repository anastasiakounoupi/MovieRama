import Swiper from 'https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js'

export const similarMoviesSlider = () => {
 const swiper = new Swiper('.swiper', {
    slidesPerView: 5.3,
    spaceBetween: 20,
    autoplay: {
      delay: 3500,
      stopOnLastSlide: false,
      disableOnInteraction: false
    },
    // breakpoints: {
    //   // when window width is <= 320px
    //   320: {
    //     slidesPerView: 1,
    //     spaceBetween: 5
    //   },
    //   // when window width is <= 480px
    //   425: {
    //     slidesPerView: 2,
    //     spaceBetween: 10
    //   },
    //   // when window width is <= 640px
    //   768: {
    //     slidesPerView: 3,
    //     spaceBetween: 20
    //   }
    // }
  })
}
