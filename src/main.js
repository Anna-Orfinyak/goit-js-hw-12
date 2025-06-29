import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import PixabayAPI from "./js/pixabay-api.js"

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
hideLoadMoreBtn();
const pixabay = new PixabayAPI();

form.addEventListener('submit', async event => {
  event.preventDefault();

  const input = form.elements['search-text'];
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  pixabay.setQuery(query);
  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await pixabay.getImagesByQuery();

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if ((pixabay.page - 1) * 15 < data.totalHits) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();
  try {
    const data = await pixabay.getImagesByQuery();
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    if ((pixabay.page - 1) * 15 >= data.totalHits) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Could not load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
