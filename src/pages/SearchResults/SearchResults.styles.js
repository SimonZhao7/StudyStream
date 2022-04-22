import styled from 'styled-components'

export const ResultsWrapper = styled.section`
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const NoResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    h1 {
        font-size: 40px;
    }
`

export const SearchText = styled.h3`
    text-align: center;
    margin: 10px;
`
