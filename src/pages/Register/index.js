import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Styles
import { FormContent, RegisterForm } from './Register.styles'
import { MainWrapper } from '../../globalStyles'
// Components
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
// Redux
import { useDispatch } from 'react-redux'
import { login } from '../../redux/features/userSlice'
// API
import AXIOS from '../../api'

const Register = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])
    const [processing, setProcessing] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        try {
            const response = await AXIOS.post('/auth/register', formData)
            if (response.status === 201) {
                const token = response.data.token
                localStorage.setItem('jwt', token)
                dispatch(login(token))
                navigate('/')
            }
        } catch (error) {
            // Only display one error max
            setErrors(error.response.data)
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
        <MainWrapper>
            <RegisterForm>
                <FormContent>
                    <legend>Register</legend>
                    {errors.length > 0 && (
                        <Alert text={errors[0]} type='error' />
                    )}
                    <Input
                        label='Email'
                        attrs={{
                            name: 'email',
                            type: 'email',
                            placeHolder: 'Enter a unique email...',
                            onChange: handleChange,
                        }}
                    />
                    <Input
                        label='Username'
                        attrs={{
                            name: 'username',
                            type: 'text',
                            placeHolder: 'Pick an amazing username...',
                            onChange: handleChange,
                        }}
                    />
                    <Input
                        label='Password'
                        attrs={{
                            name: 'password',
                            type: 'password',
                            placeHolder: 'Include an unbreakable password...',
                            onChange: handleChange,
                        }}
                    />
                    <Input
                        label='Confirm Password'
                        attrs={{
                            name: 'confirmPassword',
                            type: 'password',
                            placeHolder: 'Type it again...',
                            onChange: handleChange,
                        }}
                    />
                    <Button
                        label='Done!'
                        onClick={handleSubmit}
                        loading={processing}
                    />
                </FormContent>
            </RegisterForm>
        </MainWrapper>
    )
}

export default Register
