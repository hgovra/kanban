export const Types = {
  SET_TAREFAS: "tarefas/SET_TAREFAS",
  SET_COLUNAS: "tarefas/SET_COLUNAS",
};

const tarefasSalvas = [
  { id: "t01", content: "First task" },
  { id: "t02", content: "Second task" },
  { id: "t03", content: "Third task" },
  { id: "t04", content: "Fourth task" },
  { id: "t05", content: "Fifth task" },
]

const colunasSalvas = {
    "c01": {
      name: "Requested",
      items: tarefasSalvas,
    },
    "c02": {
      name: "To do",
      items: [],
    },
    "c03": {
      name: "In Progress",
      items: [],
    },
    "c04": {
      name: "Done",
      items: [],
    },
};

const initialState = {
  colunas: colunasSalvas,
  tarefas: tarefasSalvas
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
