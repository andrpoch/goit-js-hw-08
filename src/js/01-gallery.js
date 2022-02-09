import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line


const gallery = document.querySelector('.gallery');
   
const markup = galleryItems.map(({ description, original, preview }) => 
`<a class="gallery__item" href="${original}">
<img class="gallery__image" src="${preview}" alt="${description}" />
</a>`)
   .join('');
gallery.insertAdjacentHTML("afterbegin", markup);

const captionOptions = {
    captionSelector:'img',
    captionType:'attr',
    captionsData:'alt',
    captionPosition:'bottom',
    captionDelay: 250,
    uniqueImages: true,
   };

let lightbox = new SimpleLightbox('.gallery a', captionOptions);