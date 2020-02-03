import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/spinner';
import { getCurrentProfile } from '../../actions/profile';
import DashboardAction from './dashboardAction'

const Dashboard = ({getCurrentProfile, auth: { user}, profile: {profile, loading}}) => {
    useEffect(()=>{
        getCurrentProfile();
    }, []);
    return loading && profile === null ?<Spinner /> : 
    <Fragment>
        <h1>Welcome {user && user.login}</h1>
        {profile !== null?(
            <Fragment>
                <DashboardAction />
            </Fragment>
        ) :(
            <Fragment>
                <p>you have not a profile, add some info</p>
                <Link to='/create-profile' className='btn btn-dark my-1'>
                    Create Profile
                </Link>
            </Fragment>
        )
    }
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToprops = state =>({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToprops, {getCurrentProfile}) (Dashboard)
