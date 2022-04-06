import React from 'react'
import {
    FlashcardWrapper,
    NumberingWrapper,
    InfoWrapper,
    ButtonsWrapper,
    QuestionWrapper,
    AnswerWrapper,
} from './Flashcard.styles'
import Button from '../Button'

const Flashcard = ({ flashcard, index }) => {
    const { question, answer } = flashcard
    return (
        <FlashcardWrapper>
            <NumberingWrapper>
                <h4>{index}</h4>
            </NumberingWrapper>
            <InfoWrapper>
                <QuestionWrapper>
                    <h1>{question}</h1>  
                </QuestionWrapper>
                <AnswerWrapper>
                    <h4>{answer}</h4>
                </AnswerWrapper>
            </InfoWrapper>
            <ButtonsWrapper>
                <Button
                    label='Delete'
                    color={'var(--error-color)'}
                    hoverColor={'var(--error-color-hover)'}
                />
            </ButtonsWrapper>
        </FlashcardWrapper>
    )
}

export default Flashcard