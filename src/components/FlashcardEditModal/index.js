import React, { useEffect, useRef } from 'react'
// Styles
import { ModalWrapper, FormWrapper } from './FlashcardEditModal'
// Components
import FlashcardForm from '../FlashcardForm'
// Redux
import { useDispatch } from 'react-redux'
import { closeEditModal } from '../../redux/features/studySetSlice'

const FlashcardEditModal = () => {
    const dispatch = useDispatch()
    const formRef = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (!formRef.current.contains(e.target)) {
                dispatch(closeEditModal())
            }
        }
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [dispatch])

    return (
        <ModalWrapper>
            <FormWrapper ref={formRef}>
                <FlashcardForm />
            </FormWrapper>
        </ModalWrapper>
    )
}

export default FlashcardEditModal
