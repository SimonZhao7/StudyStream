import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Styles
import {
    VMainWrapper,
    FlashcardWrapper,
    Flashcard,
    QuestionWrapper,
    AnswerWrapper,
    FlashcardNav,
} from './StudyFlashcards.styles'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySet } from '../../redux/features/studySetSlice'
// Components
import Button from '../../components/Button'

const StudyFlashcards = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { flashcards } = useSelector((state) => state.studySet.studySet)
    const loading = useSelector((state) => state.studySet.loading)
    const [flipped, setFlipped] = useState(false)
    const [flashcardIndex, setFlashcardIndex] = useState(0)

    useEffect(() => {
        dispatch(fetchStudySet(id))
    }, [dispatch, id])

    return (
        <VMainWrapper>
            {!loading && (
                <>
                    <FlashcardWrapper>
                        <Flashcard className={`${flipped ? 'flipped' : null}`} onClick={() => setFlipped(prev => !prev)}>
                            <QuestionWrapper>
                                <h2>{flashcards[flashcardIndex].question}</h2>
                            </QuestionWrapper>
                            <AnswerWrapper>
                                {/* Prevent answers from showing on flashcard change */}
                                {flipped &&
                                    <h2>{flashcards[flashcardIndex].answer}</h2>
                                }
                            </AnswerWrapper>
                        </Flashcard>
                    </FlashcardWrapper>
                    <FlashcardNav>
                        <Button
                            label='<'
                            onClick={() => {
                                setFlashcardIndex((prev) => prev - 1)
                                setFlipped(false)
                            }}
                            isDisabled={flashcardIndex <= 0}
                        />
                        <h3>
                            {flashcardIndex + 1} of {flashcards.length}
                        </h3>
                        <Button
                            label='>'
                            onClick={() => {
                                setFlashcardIndex((prev) => prev + 1)
                                setFlipped(false)
                            }}
                            isDisabled={flashcardIndex >= flashcards.length - 1}
                        />
                    </FlashcardNav>
                </>
            )}
        </VMainWrapper>
    )
}

export default StudyFlashcards
