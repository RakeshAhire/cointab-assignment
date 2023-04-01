import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = ({ children }) => {
    const { state } = useContext(AuthContext);

    if (!state.isAuth) {
      return  <Navigate to='/' />
    }
    return children
}

export default PrivateRoutes;
