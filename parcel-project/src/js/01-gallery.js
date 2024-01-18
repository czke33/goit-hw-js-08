import { galleryItems } from '.gallery-items.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const gallery = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    item =>
      `<li class="gallery_item">
      <a class="gallery__link" href=${item.original}>
      <img class="gallery__image"
      src=${item.preview} 
      alt=${item.description} /></a></li>`
  )
  .join(' ');

gallery.insertAdjacentHTML('beforeend', markup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
