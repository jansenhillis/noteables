'use strict';

const modal = document.querySelector('.register');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.modal-trigger');

const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};
const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
