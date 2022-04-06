import React, { useState } from "react";
import { useParams } from "react-router-dom";
// Styles
import { FormWrapper } from './FlashcardForm.styles'
// Components
import Input from "../Input"
import Button from "../Button"
import Error from "../Error";
// Redux
import { useDispatch } from "react-redux";
import { hideFlashcardForm, addFlashcard } from "../../redux/features/studySetSlice";
// API
import AXIOS from "../../api";

const FlashcardForm = () => {
    const { id } = useParams()
    const [formData, setFormData] = useState({ studySet: id })
    const [errors, setErrors] = useState([])
    const [processing, setProcessing] = useState(false)
    const token = localStorage.getItem('jwt')
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        try {
            const response = await AXIOS.post('/flashcards', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                dispatch(addFlashcard(response.data))
                dispatch(hideFlashcardForm())
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
        <FormWrapper>
            {errors.length > 0 && <Error error={errors[0]} />}
            <Input type='text' label='Question' name='question' onChange={handleChange} />
            <Input type='text' label='Answer' name='answer' onChange={handleChange} />
            <Button label='Save' onClick={handleSubmit} loading={processing} />
        </FormWrapper>
    )
}

export default FlashcardForm