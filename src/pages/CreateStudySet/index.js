import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Styles
import { CreateFormWrapper, CreateForm } from './CreateStudySet.styles'
import { MainWrapper } from '../../globalStyles'
// Components
import Input from '../../components/Input'
import Button from '../../components/Button'
import Error from '../../components/Error'
// API
import AXIOS from '../../api'

const CreateStudySet = () => {
    const [formData, setFormData] = useState({})
    const [processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState([])
    const token = localStorage.getItem('jwt')
    let navigate = useNavigate()

    if (!token) {
        navigate('/login')
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        try {
            const response = await AXIOS.post('/studysets', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                const { _id: id } = response.data.studySet
                navigate(`/edit/${id}`)
            }
        } catch (error) {
            setErrors(error.response.data)
        }

        setTimeout(() => {
            setProcessing(false)
            return () => clearTimeout()
        }, 500)
    }

    return (
        <MainWrapper>
            <CreateFormWrapper>
                <CreateForm>
                    <legend>New Study Set</legend>
                    {errors.length > 0 && <Error error={errors[0]} />}
                    <Input label='Title' name='title' onChange={handleChange} />
                    <Button label='Create' loading={processing} onClick={handleSubmit} />
                </CreateForm>
            </CreateFormWrapper>
        </MainWrapper>
    )
}

export default CreateStudySet