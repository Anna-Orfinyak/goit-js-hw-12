import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images.map(image => `
    <li class="gallery-item">
        <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" width="360"/>
        </a>
        <div class="info">
            <div class="statistic-info">  
                <p class="statistic-item-name">Likes</p>
                <p class="statistic-item-value">${image.likes}</p>
            </div>
            <div class="statistic-info">
                <p class="statistic-item-name">Views</p>
                <p class="statistic-item-value">${image.views}</p>
            </div>
            <div class="statistic-info">
                <p class="statistic-item-name">Comments</p>
                <p class="statistic-item-value">${image.comments}</p>
            </div>
            <div class="statistic-info">
                <p class="statistic-item-name">Downloads</p>
                <p class="statistic-item-value">${image.downloads}</p>
            </div>
        </div>
    </li>`).join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function hideLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load-more');
  console.log('Hiding button:', loadMoreBtn);
  loadMoreBtn.classList.add('hidden');
}

export function showLoadMoreBtn() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.remove('hidden');
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');
  }

export function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
  }


  