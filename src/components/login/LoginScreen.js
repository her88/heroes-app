import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({history}) => {

    //const history = useHistory();

    // extraigo de mi context AuthContext la propiedad dispatch
    const { dispatch } = useContext(AuthContext);

    const handleClick = () => {
        //history.push('/');

        const lastPath = localStorage.getItem('lastPath') || '/';

        dispatch({
            type: types.login,
            payload: {
                name: 'Hernan'
            }
        });

        // reemplaza en el historial como que no visito el login
        history.replace(lastPath);
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button className="btn btn-primary" onClick={handleClick}>
                Login
            </button>
        </div>
    )
}
