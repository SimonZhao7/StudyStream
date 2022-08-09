import styled from 'styled-components'

export const FormWrapper = styled.form`
    width: 100%;
    background-color: white;
    padding: 60px 30px;
    border-radius: 3px;
    color: var(--dark-gray);

    @media screen and (max-width: 576px) {
        padding: 60px 15px;
        border-radius: 5px;
    }
`