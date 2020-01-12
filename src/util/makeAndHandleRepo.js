/* eslint-disable import/no-extraneous-dependencies */

import fetch from 'isomorphic-fetch';

// Polyfill Promises for IE and older browsers.
require('es6-promise').polyfill();

const REPO_URI = 'https://api.github.com/users/';

export default function makeAndHandleRepo(selected) {
  return fetch(`${REPO_URI}${selected}/repos`)
    .then((resp) => resp.json())
    .then((result) => {
      const repo = result.map((i) => ({
        id: i.created_at,
        name: i.name,
      }));
      return {repo};
    });
    // .then((resp) => resp.json())
    // .then(({items, total_count}) => { /* eslint-disable-line camelcase */
    //   const options = items.map((i) => ({
    //     //avatar_url: i.avatar_url,
    //     id: i.id,
    //     login: i.login,
    //   }));
    //   return {options, total_count};
    // });

    // axios.get(REPO_URI+ this.state.userName +'/repos').then((response)=>{
    //     this.setState({repoList:[...response.data]});
    //     this.setState({error:''});
    //   })
    //   .catch(error=>{
    //     console.log(error);
    //       this.setState({error:error.response.status});
    //   })
}