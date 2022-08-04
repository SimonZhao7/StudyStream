import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// Styles
import {
    FlashcardWrapper,
    Flashcard,
    QuestionWrapper,
    AnswerWrapper,
    FlashcardNav,
    StudySetContent,
    SpotifyEmbed,
    VWrapper,
} from './StudyFlashcards.styles'
import { MainWrapper } from '../../globalStyles'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudySet } from '../../redux/features/studySetSlice'
// Components
import Button from '../../components/Button'

const StudyFlashcards = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { flashcards, playlistId } = useSelector(
        (state) => state.studySet.studySet
    )
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
        } else if (
            e.code === 'ArrowRight' &&
            flashcardIndex < flashcards.length - 1
        ) {
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
        <MainWrapper>
            {!loading && (
                <>
                    {flashcards.length > 0 ? (
                        <StudySetContent>
                            {playlistId && (
                                <aside>
                                    <SpotifyEmbed
                                        id='playlist-embed'
                                        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
                                        frameBorder='0'
                                        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                                    />
                                </aside>
                            )}

                            <section>
                                <FlashcardWrapper ref={flashcard}>
                                    <Flashcard
                                        className={`${
                                            flipped ? 'flipped' : null
                                        }`}
                                        onClick={handleFlip}
                                    >
                                        <QuestionWrapper>
                                            <h2>
                                                {
                                                    flashcards[flashcardIndex]
                                                        .question
                                                }
                                            </h2>
                                        </QuestionWrapper>
                                        <AnswerWrapper>
                                            {/* Prevent answers from showing on flashcard change */}
                                            {flipped && (
                                                <h2>
                                                    {
                                                        flashcards[
                                                            flashcardIndex
                                                        ].answer
                                                    }
                                                </h2>
                                            )}
                                        </AnswerWrapper>
                                    </Flashcard>
                                </FlashcardWrapper>
                                <FlashcardNav>
                                    <Button
                                        label='<'
                                        onClick={() =>
                                            handleFlashcardScroll(
                                                flashcardIndex - 1
                                            )
                                        }
                                        isDisabled={flashcardIndex <= 0}
                                    />
                                    <h3>
                                        {flashcardIndex + 1} of{' '}
                                        {flashcards.length}
                                    </h3>
                                    <Button
                                        label='>'
                                        onClick={() =>
                                            handleFlashcardScroll(
                                                flashcardIndex + 1
                                            )
                                        }
                                        isDisabled={
                                            flashcardIndex >=
                                            flashcards.length - 1
                                        }
                                    />
                                </FlashcardNav>
                            </section>
                        </StudySetContent>
                    ) : (
                        <VWrapper>
                            <h1>This study set has no flashcards...</h1>
                            <Button
                                label='Return'
                                color={'var(--secondary-color)'}
                                hoverColor={'var(--secondary-color-hover)'}
                                width={'30%'}
                                onClick={() => navigate(-1)}
                            />
                        </VWrapper>
                    )}
                </>
            )}
        </MainWrapper>
    )
}

export default StudyFlashcards
