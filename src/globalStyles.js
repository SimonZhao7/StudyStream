import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Poppins', sans-serif;
        --primary-color: #1690c4;
        --secondary-color: #1dc6cc;
        --primary-color-hover: #11749e;
        --secondary-color-hover: #18b0b5;
        --error-color: #f20000;
    }

    html, body, #root {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: white;
        background-color: var(--primary-color);
        height: 100%;
    }

    input {
        :focus {
            outline: none;
        }
    }
`

export default GlobalStyle