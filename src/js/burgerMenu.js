"use strict"
const menuBtn = document.querySelector('.burger-menu__button'),
	navMenu = document.querySelector('.nav'),
	link = document.querySelectorAll('.menu__item');

	const closeMenu = () => {
		menuBtn.classList.remove('active');
		navMenu.classList.remove('nav__active');
	}
	
	const openMenu = (e) => {
		let defaultMenu = false;
		e.preventDefault();
		menuBtn.classList.toggle('active');
		navMenu.classList.toggle('nav__active');
	}
	menuBtn.addEventListener('click', openMenu)
	link.forEach(el => el.addEventListener('click', closeMenu))







