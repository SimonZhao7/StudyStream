import styled from 'styled-components';


export const RegisterWrapper = styled.section`
    width: 100%;
    height: calc(100% - 50px);

    display: flex;
    justify-content: center;
`

export const RegisterForm = styled.form`
    width: 500px;
    height: 425px;
    padding: 20px;
    border-radius: 10px;
    margin-top: 75px;
    
    display: flex;
    align-items: center;

    background-color: white;
    color: black;

    legend {
        font-size: 26px;
        text-align: center;
        margin-bottom: 15px;
    }
`

export const FormContent = styled.div`
    flex: 1;
`