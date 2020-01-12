import React, {Component } from 'react';

import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import SearchList from '../components/SearchList/SearchList';
import ListRepos from '../components/ListRepos/ListRepos';
import makeAndHandleRequest from '../util/makeAndHandleSearch';
import makeAndHandleRepo from '../util/makeAndHandleRepo';

import './App.css';

class App extends Component{
//properties  
state = {
  isLoading: false,
  options: [],
  username:'',
  repoList:null,
  error:false
};

//methods
handleSearch = (query) => {
  this.setState({isLoading: true});
  makeAndHandleRequest(query)
    .then(({options}) => {
      this.setState({
        isLoading: false,
        error: false,
        options: [...options],
      });
    })
    .catch(err => {
      this.setState({error:true});
    });
}
handleSelection = (selected) =>{
  if(selected[0]){
    this.setState({username : selected[0].login});
  }
  else{
    this.setState({
      repoList: null
    });
  }
}

componentDidUpdate(prevProps,prevState){
  if (this.state.username !== prevState.username) {
    makeAndHandleRepo(this.state.username)
    .then(response => {
      this.setState({
        error:false,
        repoList:[...response.repo]
      });
    })
    .catch(err => {
      this.setState({error:true});
    });
  }
}

render(){

  let repoListDisplay = null;
  let repoListTitle = null;
  if(!this.state.error){
    if(this.state.repoList){
      if(this.state.repoList.length>0){
        repoListTitle = <h5 className="text-center github-repository-title">Repository of {this.state.username}</h5>
        repoListDisplay = this.state.repoList.map(repo=>(
        <ListRepos repoInfo={repo} key={repo.id}></ListRepos>
        ))
      }
      else{
        repoListDisplay = <p>Username doesnt have any repository to show</p>
      }
    }
  }
  else {
    repoListDisplay =<p>Opps dear !! Something went wrong. Try again later</p>
  }

  return(
      <div className="container github-repo-container">
        <h2 className="text-center m-4 github-title">Github Username Repository Finder</h2>
        <div className="row justify-content-center">
          <div className="col-6">
            <AsyncTypeahead
            {...this.state}
            id="github-user-typeahead"
            labelKey="login"
            minLength={1}
            onSearch={this.handleSearch}
            selectHintOnEnter
            placeholder="Search for a Github username"
            onChange={this.handleSelection}
            renderMenuItemChildren={(option) => (
              <SearchList key={option.id} user={option}/>
            )}
            />
          </div>
          <div className="w-100"></div>
          <div className="col-6 py-4" >
            {repoListTitle}
            {repoListDisplay}
          </div>
        </div>
      </div>
    )
}
}

export default App;
