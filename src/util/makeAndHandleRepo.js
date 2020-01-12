/* eslint-disable import/no-extraneous-dependencies */

import fetch from 'isomorphic-fetch';

// Polyfill Promises for IE and older browsers.
require('es6-promise').polyfill();

const REPO_URI = 'https://api.github.com/users/';

export default function makeAndHandleRepo(selected) {
  return fetch(`${REPO_URI}${selected}/repos`)
    .then((resp) => resp.json())
    .then((result) => {
      const repo = result.map((itemRepo) => ({
        id: itemRepo.created_at,
        name: itemRepo.name,
        link: itemRepo.html_url
      }));
      return {repo};
    })
    .catch((err) => {
      return {error:true}
    });
}