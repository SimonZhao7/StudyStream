import styled from 'styled-components';

export const LoginWrapper = styled.section`
    width: 100%;
    height: calc(100% - 50px);

    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoginFormWrapper = styled.div`
    width: 500px;
    height: auto;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 40px 15px;
    color: black;

    legend {
        font-size: 26px;
        text-align: center;
    }
    margin-bottom: 100px;
`

export const LoginForm = styled.form`
    width: 100%;
`