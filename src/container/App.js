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
    this.setState({
      isLoading: true
    });
    makeAndHandleRepo(selected[0].login)
    .then(response => {
      this.setState({
        error:false,
        isLoading:false,
        repoList:[...response.repo]
      });
    })
    .catch(err => {
      this.setState({error:true});
    });
  }
  else{
    this.setState({
      repoList: null
    });
  }
}

render(){

  let repoListDisplay = null;
  if(!this.state.error){
    if(this.state.repoList){
      if(this.state.repoList.length>0){
        repoListDisplay = this.state.repoList.map(repo=>(
        <ListRepos name={repo.name} key={repo.id}></ListRepos>
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
        <h2 className="text-center m-4">Github Username Repository Finder</h2>
        <AsyncTypeahead
        {...this.state}
        id="github-user-typeahead"
        labelKey="login"
        minLength={1}
        onSearch={this.handleSearch}
        selectHintOnEnter
        placeholder="Search for a Github user"
        onChange={this.handleSelection}
        renderMenuItemChildren={(option) => (
          <SearchList key={option.id} user={option}/>
        )}
        />
        {repoListDisplay}
      </div>
    )
}
}

export default App;
