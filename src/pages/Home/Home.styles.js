import styled from 'styled-components'

export const StudySetsWrapper = styled.section`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 15px;
`

export const HomeContent = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`