import styled from 'styled-components'

export const ListWrapper = styled.section`
    width: 60%;
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;

    @media screen and (max-width: 992px) {
        width: 85%;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export const MessageWrapper = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    h1 {
        font-size: 40px;
    }
`