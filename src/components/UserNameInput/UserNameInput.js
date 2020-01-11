import React, { Fragment, Component } from 'react';
class UserNameInput extends Component{
    render(){
        return(
            <Fragment>
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