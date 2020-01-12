/* eslint-disable import/no-extraneous-dependencies */

import fetch from 'isomorphic-fetch';

// Polyfill Promises for IE and older browsers.
require('es6-promise').polyfill();

const SEARCH_URI = 'https://api.github.com/search/users';

export default function makeAndHandleRequest(query, page = 1) {
  return fetch(`${SEARCH_URI}?q=${query}+in:login&page=${page}&per_page=50`)
    .then((resp) => resp.json())
    .then(
      ({items}) => {
      const options = items.map((optionItem) => ({
        avatarUrl: optionItem.avatar_url,
        id: optionItem.id,
        login: optionItem.login,
      }));
      return {options};
    })
    .catch((err) => {
      console.log(err);
      return {error:true}
    });
}
