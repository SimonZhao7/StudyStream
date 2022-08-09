import React from 'react'
import { useNavigate } from 'react-router-dom'
// Styles
import {
    FlashcardWrapper,
    NumberingWrapper,
    InfoWrapper,
    ButtonsWrapper,
    QuestionWrapper,
    AnswerWrapper,
} from './Flashcard.styles'
import MediaQuery from 'react-responsive'
// Redux
import { useDispatch } from 'react-redux'
import {
    removeFlashcard,
    openEditModal,
} from '../../redux/features/studySetSlice'
// Components
import Button from '../Button'
// API
import AXIOS from '../../api'

const Flashcard = ({ flashcard, index }) => {
    const { question, answer, _id: id } = flashcard
    const token = localStorage.getItem('jwt')
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const handleDelete = async () => {
        try {
            const response = await AXIOS.delete(`/flashcards/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status === 200) {
                dispatch(removeFlashcard(index - 1))
            }
        } catch (error) {
            // Only happens on 404 or 401 error which shouldn't happen if user is authenticated
            navigate('/login')
        }
    }

    const handleEditClick = () => {
        dispatch(openEditModal(id))
    }

    return (
        <FlashcardWrapper>
            <MediaQuery minWidth={577}>
                <NumberingWrapper>
                    <h4>{index}</h4>
                </NumberingWrapper>
            </MediaQuery>

            <InfoWrapper>
                <QuestionWrapper>
                    <h1>{question}</h1>
                </QuestionWrapper>
                <AnswerWrapper>
                    <h4>{answer}</h4>
                </AnswerWrapper>
            </InfoWrapper>
            <ButtonsWrapper>
                <Button label='Edit' onClick={handleEditClick} />
                <Button
                    label='Delete'
                    color={'var(--error-color)'}
                    hoverColor={'var(--error-color-hover)'}
                    onClick={handleDelete}
                />
            </ButtonsWrapper>

            <MediaQuery and maxWidth={576}>
                <NumberingWrapper>
                    <h4>{index}</h4>
                </NumberingWrapper>
            </MediaQuery>
        </FlashcardWrapper>
    )
}

export default Flashcard
