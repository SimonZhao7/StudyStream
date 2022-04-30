import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

    const { flashcards } = useSelector((state) => state.studySet.studySet)
    const loading = useSelector((state) => state.studySet.loading)
    const [flipped, setFlipped] = useState(false)
    const [flashcardIndex, setFlashcardIndex] = useState(0)
    const flashcard = useRef()
    const [canFlip, setCanFlip] = useState(true)

    const handleFlip = () => {
        if (canFlip) {
            setCanFlip(false)
            setFlipped((prev) => !prev)
            setTimeout(() => {
                setCanFlip(true)
            }, 500)
        }
    }

    const handleFlashcardScroll = (flashcardNum) => {
        setFlashcardIndex(flashcardNum)
        setFlipped(false)
    }

    const handleKeyPress = (e) => {
        if (e.code === 'Space') {
            handleFlip()
        } else if (e.code === 'ArrowRight' && flashcardIndex < flashcards.length - 1) {
            handleFlashcardScroll(flashcardIndex + 1)
        } else if (e.code === 'ArrowLeft' && flashcardIndex > 0) {
            handleFlashcardScroll(flashcardIndex - 1)
        }
    }

    useEffect(() => {
        dispatch(fetchStudySet(id))
    }, [dispatch, id])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    })

    return (
        <VMainWrapper>
            {!loading &&
                (flashcards.length > 0 ? (
                    <>
                        <FlashcardWrapper ref={flashcard}>
                            <Flashcard
                                className={`${flipped ? 'flipped' : null}`}
                                onClick={handleFlip}
                            >
                                <QuestionWrapper>
                                    <h2>
                                        {flashcards[flashcardIndex].question}
                                    </h2>
                                </QuestionWrapper>
                                <AnswerWrapper>
                                    {/* Prevent answers from showing on flashcard change */}
                                    {flipped && (
                                        <h2>
                                            {flashcards[flashcardIndex].answer}
                                        </h2>
                                    )}
                                </AnswerWrapper>
                            </Flashcard>
                        </FlashcardWrapper>
                        <FlashcardNav>
                            <Button
                                label='<'
                                onClick={() => handleFlashcardScroll(flashcardIndex - 1)}
                                isDisabled={flashcardIndex <= 0}
                            />
                            <h3>
                                {flashcardIndex + 1} of {flashcards.length}
                            </h3>
                            <Button
                                label='>'
                                onClick={() => handleFlashcardScroll(flashcardIndex + 1)}
                                isDisabled={
                                    flashcardIndex >= flashcards.length - 1
                                }
                            />
                        </FlashcardNav>
                    </>
                ) : (
                    <>
                        <h1>This study set has no flashcards...</h1>
                        <Button
                            label='Return'
                            color={'var(--secondary-color)'}
                            hoverColor={'var(--secondary-color-hover)'}
                            width={'15%'}
                            onClick={() => navigate(-1)}
                        />
                    </>
                ))}
        </VMainWrapper>
    )
}

export default StudyFlashcards
