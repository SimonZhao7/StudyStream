import React, { useEffect, useRef } from 'react'
// Styles
import { ModalWrapper, FormWrapper } from './FlashcardEditModal'
// Redux
import { useDispatch } from 'react-redux'
import { closeModals } from '../../redux/features/studySetSlice'
import { closeModals as spotifyCloseModals } from '../../redux/features/spotifySlice'

const FlashcardEditModal = ({ children }) => {
    const dispatch = useDispatch()
    const formRef = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (!formRef.current.contains(e.target)) {
                dispatch(closeModals())
                dispatch(spotifyCloseModals())
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
                {children}
            </FormWrapper>
        </ModalWrapper>
    )
}

export default FlashcardEditModal
