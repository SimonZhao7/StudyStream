import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/features/userSlice'
// Styles
import { LoginWrapper, LoginForm, LoginFormWrapper } from './Login.styles'
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
            navigate('/')
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        try {
            const response = await AXIOS.post('/auth/login', formData)
            if (response.status === 200) {
                const { token } = response.data
                localStorage.setItem('jwt', token)
                dispatch(login(token))
            }
        } catch (error) {
            setErrors(error.response.data.errors)
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
        <LoginWrapper>
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
        </LoginWrapper>
    )
}

export default Login
