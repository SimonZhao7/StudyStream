import styled from 'styled-components';


export const RegisterForm = styled.section`
    width: 550px;
    height: auto;
    padding: 60px 30px;
    border-radius: 3px;
    
    display: flex;
    align-items: center;

    background-color: white;
    color: var(--dark-gray);

    @media screen and (max-width: 576px) {
        padding: 40px 15px;
    }
`

export const FormContent = styled.form`
    flex: 1;
`