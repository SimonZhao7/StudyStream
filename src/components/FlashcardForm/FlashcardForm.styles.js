import styled from 'styled-components'

export const FormWrapper = styled.section`
    background-color: white;
    width: 100%;
    color: var(--dark-gray);
    padding: ${props => props.editing ? '60px 30px' : '20px'};
    border-radius: ${props => props.editing ? '3px' : '5px'};
`