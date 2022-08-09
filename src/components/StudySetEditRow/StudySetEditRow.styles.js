import styled from 'styled-components'

export const ButtonsWrapper = styled.div`
    width: 160px;
    display: flex;
    flex-direction: column;
    gap: 10px;


    @media screen and (max-width: 576px) {
        width: 100%;
        gap: 10px;
        button {
            width: 100%;
        }
    }
`