window.addEventListener('load', function () {
  var loader = document.querySelector('.js-preloader');
  if (loader) {
    loader.style.transition = 'opacity 1s ease-in-out';
    loader.style.opacity = '0';
    this.setTimeout(function () {
      loader.style.display = 'none';
    }, 6000);
  }
});
