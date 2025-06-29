import axios from 'axios';

const API_KEY = '51014016-712075211dd4ddd9d92f84ca4';
const baseURL = 'https://pixabay.com/api/';
const qtyPerPage = 15;

export default class PixabayAPI {
    constructor() {
        this.query = '';
        this.page = 1;
    }

    async getImagesByQuery() {
        const params = {
            key: API_KEY,
            q: this.query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: qtyPerPage,

        };

        const response = await axios.get(baseURL, { params });
        this.page += 1;
        return response.data;
    }
    
    setQuery(newQuery) {
        this.query = newQuery;
        this.page = 1;
    }
}