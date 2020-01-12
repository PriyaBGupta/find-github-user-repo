/* eslint-disable import/no-extraneous-dependencies */

import axios from 'axios';

// Polyfill Promises for IE and older browsers.
require('es6-promise').polyfill();

const REPO_URI = 'https://api.github.com/users/';

export default function makeAndHandleRepo(selected) {
    axios.get(REPO_URI+ this.state.userName +'/repos').then((response)=>{
        this.setState({repoList:[...response.data]});
        this.setState({error:''});
      })
      .catch(error=>{
        console.log(error);
          this.setState({error:error.response.status});
      })
}