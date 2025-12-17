const openBt = document.querySelector('#menu-button-open');
const closeBt= document.querySelector('#mobile-button-close');
const menu = document.querySelector('.mobile-container');
const mobileList = document.querySelector('.mobile-group');
const body = document.body;

document.addEventListener('keydown', thisOpen);

openBt.addEventListener('click', openMobileMenu);
closeBt.addEventListener('click', closeMobileMenu);


function openMobileMenu() {
    menu.classList.add('is-open');
    body.classList.add('no-scroll');
}

function closeMobileMenu() {
    menu.classList.remove('is-open');
    body.classList.remove('no-scroll');
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


const mobileLinks = document.querySelectorAll('.link-mobile a');

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});


function handleMobileLinkClick(event) {
  event.preventDefault();

  const id = event.currentTarget.getAttribute('href');
  const target = document.querySelector(id);

  if (!target) return;

  closeMobileMenu();

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

