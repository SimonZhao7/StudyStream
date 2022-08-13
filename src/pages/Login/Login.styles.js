import styled from 'styled-components';


export const LoginFormWrapper = styled.div`
    width: 550px;
    height: auto;
    background-color: white;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 60px 30px;
    color: var(--dark-gray);

    margin-bottom: 100px;

    @media screen and (max-width: 576px) {
        padding: 40px 15px;
    }
`

export const LoginForm = styled.form`
    width: 100%;
`