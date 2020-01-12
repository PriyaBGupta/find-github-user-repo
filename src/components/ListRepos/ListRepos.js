import React from 'react';
const ListRepos= (props)=>{
    return(
        <div className="card">
            <div className="card-body">
                Name : {props.name}
            </div>
        </div>
    )
}
export default ListRepos