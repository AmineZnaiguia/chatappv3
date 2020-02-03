import React from 'react';
import {Link} from 'react-router-dom'

 const dashboardAction = () => {
    return (
        <div>
           <Link to='/edit-profile' class='btn btn-dark'>Edit Profile</Link> 
        </div>
    )
}
export default dashboardAction