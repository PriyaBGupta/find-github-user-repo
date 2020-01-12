import React, { Component, Fragment } from 'react';
import axios from 'axios';
import UserNameInput from '../components/UserNameInput/UserNameInput';
import './App.css';
import ListRepos from '../components/ListRepos/ListRepos';

class App extends Component{
  state ={
    userName:'',
    repoList:null,
    error:''
  }
  nameChangeHandler=(event)=>{
    this.setState({userName:event.target.value});
  }
  enterHandler=(username)=>{
    //const code = event.keyCode || event.which;
    //if(code === 13) {
      this.setState({userName:username});
  }
  // shouldComponentUpdate(nextProps,nextState){
  //   console.log(nextState.userName , this.state.userName);
  //   if(nextState.userName!==this.state.userName){
  //     return true;
  //   }else return false;
  // }
  // componentDidUpdate(){
  //   if(this.state.userName){
  //     console.log("Have I been called");
  //     axios.get('https://api.github.com/users/'+ this.state.userName +'/repos').then((response)=>{
  //       this.setState({repoList:[...response.data]});
  //       this.setState({error:''});
  //     })
  //     .catch(error=>{
  //       console.log(error);
  //         this.setState({error:error.response.status});
  //     })
  // }
  // }
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
        <h3>Github Repo User Finder</h3>
        <UserNameInput username={this.state.userName} changed={this.nameChangeHandler} entered = {this.enterHandler}/>
          {repoListDisplay}
      </Fragment>
    );
  }
}

export default App;
