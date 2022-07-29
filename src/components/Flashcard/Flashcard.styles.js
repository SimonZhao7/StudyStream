import styled from 'styled-components'

export const FlashcardWrapper = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    padding: 20px 20px 20px 0;
    border-radius: 10px;
    color: var(--dark-gray);
    max-height: 250px;
    gap: 20px;
`

export const NumberingWrapper = styled.div`
    flex: 1;
    padding: 8px;
    border-right: 5px solid var(--secondary-color);
    font-size: 25px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const QuestionWrapper = styled.div`
    flex: 1;
`

export const AnswerWrapper = styled.div`
    flex: 1;
    word-break: break-word;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`