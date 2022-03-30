import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Roboto Condensed', sans-serif;
        --primary-color: #1dc6cc; /* #1dc6cc */
        --secondary-color: #1690c4;
    }

    body {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: white;
        background-color: var(--primary-color);
    }
`

export default GlobalStyle