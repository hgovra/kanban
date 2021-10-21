import { createGlobalStyle } from 'styled-components';

import bgImg from './img.png';

export const cores = ["#5CC4FF", "#945AD1", "#59D090", "#ee9a39"];
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #e1e8ed url(${bgImg}) no-repeat 80% 90% fixed;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    letter-spacing: 0.3px;
    font-size: 14px;
    min-height: 97vh;
    color: #212529;
  }
`;

export default GlobalStyle;