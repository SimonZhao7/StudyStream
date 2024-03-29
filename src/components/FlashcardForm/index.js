import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// Styles
import { FormWrapper } from './FlashcardForm.styles'
// Components
import Input from '../Input'
import Button from '../Button'
import Alert from '../Alert'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    hideFlashcardForm,
    addFlashcard,
    closeModals,
    updateFlashcard,
} from '../../redux/features/studySetSlice'
// API
import AXIOS from '../../api'

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
            dispatch(closeModals())
            return () => clearTimeout()
        }, 500)
    }

    return (
        <FormWrapper editing={editingId}>
            {editingId && <legend>Edit Flashcard</legend>}
            {errors.length > 0 && <Alert text={errors[0]} type='error' />}
            <Input 
                label='Question'
                attrs={{
                    type: 'text',
                    name: 'question',
                    onChange: handleChange,
                }}
            />
            <Input
                label='Answer'
                attrs={{ 
                    type: 'text',
                    name: 'answer',
                    onChange: handleChange,
                }}
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