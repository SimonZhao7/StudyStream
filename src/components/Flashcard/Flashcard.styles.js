import styled from 'styled-components'

export const FlashcardWrapper = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    padding: 20px 20px 20px 0;
    border-radius: 5px;
    color: var(--dark-gray);
    max-height: 350px;
    gap: 20px;

    @media screen and (max-width: 576px) {
        padding-left: 20px;
        flex-direction: column;
    }
`

export const NumberingWrapper = styled.div`
    flex: 1;
    padding: 8px;
    border-right: 5px solid var(--secondary-color);
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 576px) {
        flex: none;
        width: 25px;
        height: 25px;
        border: 0;
        color: white;
        padding: 10px;
        border-radius: 3px;
        background-color: var(--secondary-color);
        font-size: 18px;
    }
`

export const InfoWrapper = styled.div`
    flex: 18;
    display: flex;
    flex-direction: column;

    > div {
        ::-webkit-scrollbar {
            display: none;
        }
        max-height: 50px;
    }
`

export const ButtonsWrapper = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const QuestionWrapper = styled.div`
    flex: 1;
    word-break: break-word;
    overflow-y: scroll;
`

export const AnswerWrapper = styled.div`
    flex: 1;
    word-break: break-word;
    overflow-y: scroll;
`