import colunasSalvas from "./dados.json";

export const Types = {
  SET_TAREFAS: "quadro/SET_TAREFAS",
  SET_COLUNAS: "quadro/SET_COLUNAS",
};

const initialState = {
  colunas: colunasSalvas
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_TAREFAS:
      return { ...state, tarefas: action.payload };
    case Types.SET_COLUNAS:
      return { ...state, colunas: action.payload };
    default:
      return state;
  }
}

export function setTarefas(tarefas) {
  return {
    type: Types.SET_TAREFAS,
    payload: tarefas,
  };
}

export function setColunas(colunas) {
  return {
    type: Types.SET_COLUNAS,
    payload: colunas,
  };
}
