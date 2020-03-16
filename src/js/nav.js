const classToggle = () => {
    const navs = document.querySelectorAll('.navbar__items')
    navs.forEach(nav => nav.classList.toggle('toggle-show'));
}

document.querySelector('.navbar__link--toggle').addEventListener('click', classToggle);