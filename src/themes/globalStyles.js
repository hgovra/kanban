/**
 *  Definindo os estilos de CSS globais
 *  para o projeto através do styled-components.
 *  Aqui também está um array com o HEX das
 *  cores que vão pras colunas do kanban.
 */

import { createGlobalStyle } from "styled-components";

import bgImg from "./img.png";

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

  .coluna-cor-0 .react-tag-input__tag {
    background: ${cores[0]};
  }
  .coluna-cor-1 .react-tag-input__tag {
    background: ${cores[1]};
  }
  .coluna-cor-2 .react-tag-input__tag {
    background: ${cores[2]};
  }
  .coluna-cor-3 .react-tag-input__tag {
    background: ${cores[3]};
  }

  .emoji-mart button, .emoji-mart-category .emoji-mart-emoji span {
    cursor: pointer;
  }
  .emoji-mart-category .emoji-mart-emoji:hover:before {
    margin: 2px 0 0 5px;
  }
`;

export default GlobalStyle;
