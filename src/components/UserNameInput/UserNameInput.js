import React, { Fragment, Component } from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import GithubMenuItem from '../GithubMenuItem/GithubMenuItem';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import makeAndHandleRequest from '../../util/makeAndHandleRequest';
const PER_PAGE = 50;
class UserNameInput extends Component{
  
  //properties  
  state = {
    isLoading: false,
    options: [],
    query: '',
  };
  cache = {};

  //methods
  handleInputChange = (query) => {
    this.setState({query});
  }
  handlePagination = (e, shownResults) => {
    const {query} = this.state;
    const cachedQuery = this.cache[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    this.setState({isLoading: true});

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page)
      .then((resp) => {
        const options = cachedQuery.options.concat(resp.options);
        this.cache[query] = {...cachedQuery, options, page};
        this.setState({
          isLoading: false,
          options,
        });
      });
  }
  handleSearch = (query) => {
    if (this.cache[query]) {
      this.setState({options: this.cache[query].options});
      return;
    }

    this.setState({isLoading: true});
    makeAndHandleRequest(query)
      .then((resp) => {
        this.cache[query] = {...resp, page: 1};
        this.setState({
          isLoading: false,
          options: resp.options,
        });
      });
  }
  render(){
    return(
      <Fragment> 
        <AsyncTypeahead
        {...this.state}
        id="my-typeahead-id"
        labelKey="login"
        maxResults={PER_PAGE - 1}
        minLength={1}
        onInputChange={this.handleInputChange}
        onPaginate={this.handlePagination}
        onSearch={this.handleSearch}
        paginate
        placeholder="Search for a Github user"
        renderMenuItemChildren={(option, props) => (
          <GithubMenuItem key={option.id} user={option} />
        )}
        useCache={false} />

        <input type="text"  
        value={this.props.username} 
        onChange={this.props.changed} 
        onKeyPress={this.props.entered}
        placeholder="Search Repository for a given username"/>
      </Fragment>
      )
  }
}
export default UserNameInput;