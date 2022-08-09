import styled from 'styled-components'

export const FormWrapper = styled.form`
    background: white;
    color: var(--dark-gray);
    padding: 60px 30px;
    width: 100%;
    border-radius: 3px;

    @media screen and (max-width: 576px) {
        padding: 60px 15px;
        border-radius: 5px;
    }
`