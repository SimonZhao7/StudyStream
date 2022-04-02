import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/userSlice';


const Logout = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.removeItem('jwt')
        dispatch(logout())
        navigate('/')
    }, [dispatch, navigate])

    return (
        <></>
    )
}

export default Logout