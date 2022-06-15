import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/features/userSlice'
// Styles
import { LoginForm, LoginFormWrapper } from './Login.styles'
import { MainWrapper } from '../../globalStyles'
// Components
import Input from '../../components/Input'
import Button from '../../components/Button'
import Error from '../../components/Error'
// API
import AXIOS from '../../api'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState([])
    const loading = useSelector(state => state.user.loading)
    let navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            navigate('/home')
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        try {
            const response = await AXIOS.post('/auth/login', formData)
            if (response.status === 200) {
                const token = response.data.token
                localStorage.setItem('jwt', token)
                dispatch(login(token))
                navigate('/home')
            }
        } catch (error) {
            setErrors(error.response.data)
        }
        setTimeout(() => {
            setProcessing(false)
            return () => clearTimeout()
        }, 500)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <MainWrapper>
            {!loading && 
            <LoginFormWrapper>
                <LoginForm>
                    <legend>Login</legend>
                    {errors.length > 0 && <Error error={errors[0]} />}
                    <Input
                        type='text'
                        name='username'
                        label='Username'
                        onChange={handleChange}
                    />
                    <Input
                        type='password'
                        name='password'
                        label='Password'
                        onChange={handleChange}
                    />
                    <Button label='Login' onClick={handleSubmit} loading={processing} />
                </LoginForm>
            </LoginFormWrapper>
            }          
        </MainWrapper>
    )
}

export default Login
