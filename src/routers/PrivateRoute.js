import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';


// functional component
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...res
}) => {

    localStorage.setItem('lastPath', res.location.pathname);

    return (
       <Route {...res}
            component= { (props) => (
                (isAuthenticated)
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            )}
       />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
