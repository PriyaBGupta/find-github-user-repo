import React from 'react';
import PropTypes from 'prop-types';
import './SearchList.css';

const SearchList = (props) => {
  return(
  <div>
    <img
      alt={props.user.login}
      src={props.user.avatarUrl}
      className='custom-logo'
    />
    <span>{props.user.login}</span>
  </div>
)}

SearchList.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired
  }).isRequired
};

export default SearchList;
