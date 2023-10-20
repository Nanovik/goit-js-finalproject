import { galleryItems } from './gallery-items.js';
// Change code below this line

const list = document.querySelector(".gallery");

function createMarkup(arr) {
  return arr
    .map(({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
    `).join("");
}

list.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));
list.addEventListener("click", handlerClick);

let instance;

function handlerClick(evt) {
    evt.preventDefault(); 
    if (evt.currentTarget === evt.target) {
        return;
    }
//   if (evt.target.classList.contains('gallery')) {
//     return;
//   }    

    const currentPicture = evt.target.closest(".gallery__image");
    const img = evt.target.dataset.source;
    const description = currentPicture.alt;
    createModal(img, description);
}

function createModal(img, description) {
    const instance = basicLightbox.create(
        `
            <img
                class="gallery__image"
                src="${img}"
                alt="${description}"
            />
        `,
        {
            onShow: instance => {
                document.addEventListener('keydown', modalClose);
            },
            onClose: instance => {
                document.removeEventListener('keydown', modalClose);
            },
        }
    );

    instance.show();

    function modalClose(event) {
        if (event.code === 'Escape') {
            instance.close();
        }
    }
}