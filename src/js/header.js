const openBt = document.querySelector('#menu-button-open');
const closeBt= document.querySelector('#mobile-button-close');
const menu = document.querySelector('.mobile-menu');
const mobileList = document.querySelector('.mobile-group');
const mobileup = document.querySelector('.mobile-up');

document.addEventListener('keydown', thisOpen);

openBt.addEventListener('click', openMobileMenu);
closeBt.addEventListener('click', closeMobileMenu);


function openMobileMenu() {
    menu.classList.add('is-open');
}

function closeMobileMenu() {
    menu.classList.remove('is-open');
}

mobileList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
})


function thisOpen (event) {
    if (event.key == 'Escape')
        closeMobileMenu();
}


menu.addEventListener('click', function (event) {
  if (event.target === menu) {
    closeMobileMenu();
  }
});




