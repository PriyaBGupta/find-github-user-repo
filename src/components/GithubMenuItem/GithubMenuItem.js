import PropTypes from 'prop-types';
import React from 'react';

const GithubMenuItem = (props) => {
  return(
  <div>
    {/* <img
      alt={props.user.login}
      src={props.user.avatar_url}
      style={{
        height: '24px',
        marginRight: '10px',
        width: '24px',
      }}
    /> */}
    <span>{props.user.login}</span>
  </div>
)}

GithubMenuItem.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
  }).isRequired,
};

export default GithubMenuItem;
