import { createGlobalStyle } from 'styled-components';

import bgImg from './img.png';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #e1e8ed url(${bgImg}) no-repeat 80% 90%;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }
`;

export default GlobalStyle;