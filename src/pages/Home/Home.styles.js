import styled from 'styled-components'

export const StudySetsWrapper = styled.section`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 15px;
`