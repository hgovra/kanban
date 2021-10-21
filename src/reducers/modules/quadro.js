export const Types = {
  SET_TAREFAS: "quadro/SET_TAREFAS",
  SET_COLUNAS: "quadro/SET_COLUNAS",
};

const colunasSalvas = {
    "c01": {
      nome: "📝 To Do",
      cor: 0,
      items: [
        { id: "t01", content: "Documentar padrões mobile" },
        { id: "t02", content: "Ajustes fluxo de compra" },
        { id: "t03", content: "Banners da home" },
        { id: "t04", content: "Template de e-mail marketing" }
      ],
    },
    "c02": {
      nome: "💻 In Progress",
      cor: 1,
      items: [
        { id: "t05", content: "Wireframe das telas" }
      ],
    },
    "c03": {
      nome: "🚀 Done",
      cor: 2,
      items: [
        { id: "t06", content: "Implementação do blog" },
        { id: "t07", content: "Análise de métricas" },
        { id: "t08", content: "UX Review" }
      ],
    }
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
