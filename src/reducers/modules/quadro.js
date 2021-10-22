/**
*  Definindo os dados que seram armazenados e 
*  fornecidos pelo Redux.
*  No mundo real, os dados viriam do servidor com
*  um fetch ou usando axios.
*  Aqui, eu simulei importando de um arquivo JSON
*  dentro do projeto.
*/

import colunasSalvas from "./dados.json";

export const Types = {
  SET_COLUNAS: "quadro/SET_COLUNAS",
};

const initialState = {
  colunas: colunasSalvas,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_COLUNAS:
      return { ...state, colunas: action.payload };
    default:
      return state;
  }
}

export function setColunas(colunas) {
  return {
    type: Types.SET_COLUNAS,
    payload: colunas,
  };
}
