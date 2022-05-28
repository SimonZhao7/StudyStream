import styled from 'styled-components'

export const StudySetContent = styled.section`
    height: 500px;
    display: flex;
    gap: 50px;
`

export const FlashcardWrapper = styled.section`
    width: 800px;
    height: 500px;
    color: black;

    perspective: 2000px;

    .flipped {
        transform: rotateX(180deg);
    }
`

export const Flashcard = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

    transition: transform 0.5s ease;
    transform-style: preserve-3d;

    div {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 20px;

        display: flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;

        h2 {
            font-size: 28px;
            text-align: center;
            font-weight: 400;
        }
    }
`

export const QuestionWrapper = styled.div`
`

export const AnswerWrapper = styled.div`
    transform: rotateX(180deg);
`

export const FlashcardNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    div {
        width: 30px;
    }
`

export const SpotifyEmbed = styled.iframe`
    height: 100%;
    border-radius: 10px;
`