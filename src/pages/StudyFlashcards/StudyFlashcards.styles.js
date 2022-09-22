import styled from 'styled-components'

export const StudySetContent = styled.section`
    display: flex;
    justify-content: center;
    gap: 50px;
    width: 100%;

    @media screen and (max-width: 1200px) {
        display: block;
    }
`

export const FlashcardSection = styled.section`
    width: 800px;
    height: auto;
    aspect-ratio: 8 / 5;
    perspective: 2000px;

    @media screen and (max-width: 1200px) {
        max-width: 600px;
        width: 100%;
        margin: auto;
    }

    .flipped {
        transform: rotateX(180deg);
    }
`

export const FlashcardWrapper = styled.section`
    position: relative;
    width: 100%;
    height: 100%;
    color: var(--dark-gray);

    transition: transform 0.5s ease;
    transform-style: preserve-3d;

    > div {
        position: absolute;
        background-color: white;
        width: 100%;
        height: 100%;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

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

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
`

export const VWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`