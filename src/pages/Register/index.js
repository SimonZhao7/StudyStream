import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Styles
import { RegisterWrapper, FormContent, RegisterForm } from './Register.styles'
// Components
import Input from '../../components/Input'
import Button from '../../components/Button'
import Error from '../../components/Error'
// API
import AXIOS from '../../api'

const Register = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        try {
            const response = await AXIOS.post('/users/register', formData)
            if (response.status === 201) {
                navigate('/')
            }
        } catch (error) {
            // Only display one error max
            setErrors(error.response.data.errors)
            // Time delay just for styling
            setTimeout(() => {
                setProcessing(false)
                return () => clearTimeout()
            }, 500)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <RegisterWrapper>
            <RegisterForm>
                <FormContent>
                    <legend>Register</legend>
                    {errors.length > 0 && <Error error={errors[0]}/>}
                    <Input
                        label='Email'
                        name='email'
                        type='email'
                        placeHolder='Enter a unique email...'
                        onChange={handleChange}
                    />
                    <Input
                        label='Username'
                        name='username'
                        type='text'
                        placeHolder='Pick an amazing username...'
                        onChange={handleChange}
                    />
                    <Input
                        label='Password'
                        name='password'
                        type='password'
                        placeHolder='Include an unbreakable password...'
                        onChange={handleChange}
                    />
                    <Input
                        label='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        placeHolder='Type it again...'
                        onChange={handleChange}
                    />
                    <Button label='Done!' onClick={handleSubmit} loading={processing} />
                </FormContent>
            </RegisterForm>
        </RegisterWrapper>
    )
}

export default Register