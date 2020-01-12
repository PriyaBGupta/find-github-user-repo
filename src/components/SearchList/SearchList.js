import React from 'react';
import PropTypes from 'prop-types';
import classes from './SearchList.module.css';

const SearchList = (props) => {
  return(
  <div>
    <img
      alt={props.user.login}
      src={props.user.avatarUrl}
      className={classes['custom-logo']}
    />
    <span>{props.user.login}</span>
  </div>
)}

SearchList.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl:PropTypes.string.isRequired
  }).isRequired,
};

export default SearchList;
