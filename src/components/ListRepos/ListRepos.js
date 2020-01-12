import React from 'react';
import PropTypes from 'prop-types';
import './ListRepos.css';

const ListRepos = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          {props.repoInfo.name}
          <a href={props.repoInfo.link} className="card-link float-right list-repo-link">Repo &gt;</a>
        </div>
      </div>
    </div>
  )
}
ListRepos.propTypes = {
  repoInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}).isRequired
}
export default ListRepos;