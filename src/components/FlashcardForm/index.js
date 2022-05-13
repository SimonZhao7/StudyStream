import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// Styles
import { FormWrapper } from './FlashcardForm.styles'
// Components
import Input from '../Input'
import Button from '../Button'
import Error from '../Error'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    hideFlashcardForm,
    addFlashcard,
    closeEditModal,
    updateFlashcard,
} from '../../redux/features/studySetSlice'
// API
import AXIOS from '../../api/api'

const FlashcardForm = () => {
    const { id } = useParams()
    const editingId = useSelector((state) => state.studySet.editingId)
    const [formData, setFormData] = useState({ studySet: id })
    const [errors, setErrors] = useState([])
    const [processing, setProcessing] = useState(false)
    const token = localStorage.getItem('jwt')
    const dispatch = useDispatch()

    // Variables for configuring API call
    const apiURL = editingId ? `/flashcards/${editingId}` : '/flashcards'
    const btnText = editingId ? 'Update' : 'Save'
    const method = editingId ? 'PATCH' : 'POST'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        try {
            const response = await AXIOS.request({
                url: apiURL,
                method: method,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 201) {
                dispatch(addFlashcard(response.data))
                dispatch(hideFlashcardForm())
            } else if (response.status === 200) {
                dispatch(updateFlashcard(response.data))
            }
        } catch (error) {
            setErrors(error.response.data)
        }
        setTimeout(() => {
            setProcessing(false)
            dispatch(closeEditModal())
            return () => clearTimeout()
        }, 500)
    }

    return (
        <FormWrapper>
            {errors.length > 0 && <Error error={errors[0]} />}
            <Input
                type='text'
                label='Question'
                name='question'
                onChange={handleChange}
            />
            <Input
                type='text'
                label='Answer'
                name='answer'
                onChange={handleChange}
            />
            <Button
                label={btnText}
                onClick={handleSubmit}
                loading={processing}
            />
        </FormWrapper>
    )
}

export default FlashcardForm