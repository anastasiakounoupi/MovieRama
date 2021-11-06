const scrollTopBtn = document.querySelector('.button--scroll-top');

export const scrollTop = () => {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  })
}
