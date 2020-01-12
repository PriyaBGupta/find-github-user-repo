import React from 'react';
import PropTypes from 'prop-types';
const ListRepos = (props) => {
    return(
        <div className="card">
            <div className="card-body">
                Name : {props.name}
            </div>
        </div>
    )
}
ListRepos.propTypes = {
    name:PropTypes.string.isRequired
}
export default ListRepos