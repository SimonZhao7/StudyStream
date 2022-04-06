import styled from 'styled-components'

export const FlashcardWrapper = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    padding: 20px 20px 20px 0;
    border-radius: 10px;
    color: black;
    max-height: 250px;
    gap: 20px;
`

export const NumberingWrapper = styled.div`
    flex: 1;
    padding: 8px;
    border-right: 5px solid #ffeb6b;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const InfoWrapper = styled.div`
    flex: 18;
    display: flex;
    flex-direction: column;
`

export const ButtonsWrapper = styled.div`
    flex: 4;
`

export const QuestionWrapper = styled.div`
    flex: 1;
`

export const AnswerWrapper = styled.div`
    flex: 2;
    word-break: break-word;
    overflow-y: scroll;
`