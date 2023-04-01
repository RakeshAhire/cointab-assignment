import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes'
const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/home' element={<PrivateRoutes><Home /></PrivateRoutes>}></Route>
        </Routes>
    )
}

export default AllRoutes;
