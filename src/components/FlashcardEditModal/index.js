import React, { useEffect, useRef } from 'react'
// Styles
import { ModalWrapper, FormWrapper } from './FlashcardEditModal.styles'
// Redux
import { useDispatch } from 'react-redux'
import { closeModals } from '../../redux/features/studySetSlice'
import { closeModals as spotifyCloseModals } from '../../redux/features/spotifySlice'

const FlashcardEditModal = ({ special, children }) => {
    const dispatch = useDispatch()
    const formRef = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (!formRef.current.contains(e.target)) {
                dispatch(closeModals())
                dispatch(spotifyCloseModals())
            }
        }
        window.addEventListener('click', handleClick, { capture: true })
        return () => {
            window.removeEventListener('click', handleClick, { capture: true })
        }
    }, [dispatch])

    return (
        <ModalWrapper>
            <FormWrapper ref={formRef} special={special}>
                {children}
            </FormWrapper>
        </ModalWrapper>
    )
}

export default FlashcardEditModal
