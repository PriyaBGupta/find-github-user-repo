import React, { Fragment, Component } from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import GithubMenuItem from '../GithubMenuItem/GithubMenuItem';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import makeAndHandleRequest from '../../util/makeAndHandleSearch';
import ListRepos from '../ListRepos/ListRepos';
import makeAndHandleRepo from '../../util/makeAndHandleRepo';

class UserNameInput extends Component{
  
  //properties  
  state = {
    isLoading: false,
    options: [],
    query: '',
    repoList:null,
    error:''
  };
  cache = {};

  //methods
  handleSearch = (query) => {
    this.setState({isLoading: true});
    makeAndHandleRequest(query)
      .then(({options}) => {
        this.setState({
          isLoading: false,
          options,
        });
      });
  }
  handleSelection = (selected) =>{
    if(selected[0]){
      makeAndHandleRepo(selected[0].login)
      .then(response=>{
        this.setState({repoList:[...response.repo]});
        this.setState({error:''});
      })
      // axios.get('https://api.github.com/users/'+ selected[0].login +'/repos').then((response)=>{
      //     this.setState({repoList:[...response.data]});
      //     this.setState({error:''});
      //   })
      //   .catch(error=>{
      //     console.log(error);
      //       this.setState({error:error.response.status});
      //   })
    }
  }
  
  render(){

    let repoListDisplay = null;
    if(this.state.error ===''){
      if(this.state.repoList){
        if(this.state.repoList.length>0){
          repoListDisplay = this.state.repoList.map(repo=>(
          <ListRepos name={repo.name} key={repo.created_at}></ListRepos>
          ))
        }
        else{
          repoListDisplay = <p>Username doesnt have any repository to show</p>
        }
      }
    }
    else if(this.state.error === 404){
      repoListDisplay=<p>UserName not found</p>
    }
    else {
      repoListDisplay =<p>Opps dear !! Something went wrong. Try again later</p>
    }

    return(
      <Fragment> 
        <AsyncTypeahead
        {...this.state}
        id="my-typeahead-id"
        labelKey="login"
        minLength={1}
        onSearch={this.handleSearch}
        selectHintOnEnter
        placeholder="Search for a Github user"
        onChange={this.handleSelection}
        renderMenuItemChildren={(option, props) => (
          <GithubMenuItem key={option.id} user={option}/>
        )}
        useCache={false} />
        {repoListDisplay}
      </Fragment>
      )
  }
}
export default UserNameInput;