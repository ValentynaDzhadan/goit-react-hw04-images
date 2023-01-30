// https://pixabay.com/api/?q=cat&page=1&key=31677603-5140c7199bf175a8ce775458a&image_type=photo&orientation=horizontal&per_page=12

import axios from 'axios';

const API_KEY = '31677603-5140c7199bf175a8ce775458a';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getSearchPicsAPI = (query, page) => {
  return axios
    .get('?', {
      params: {
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
    .then(res => res.data);
};
