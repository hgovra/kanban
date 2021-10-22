import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  Area,
  Container,
  Mais,
  Nome,
  NovaTarefa,
  NovaTarefaBtn,
  NovoNome,
} from "./style";
import { Droppable } from "react-beautiful-dnd";

import Tarefa from "../Tarefa";

import {
  setColunas
} from "../../reducers/modules/quadro";

const Coluna = (coluna, index) => {
  const despachar = useDispatch();
  const tarefas = coluna.coluna.items;
  const [novo, setNovo] = useState(false);
  //const [isFadingOut, setIsFadingOut] = useState(false);
  const { colunas } = useSelector(
    (state) => state.quadro
  );

  const controlaClique = () => {
    setNovo(true);
  };

  const controlaTeclas = (e) => {
    if (e.key === "Enter") {
      const novasTarefas = [...colunas[coluna.colId].items];
      const dadosNovaTarefa = {
        id: uuidv4(),
        content: e.target.value,
        tags: []
      };

      novasTarefas.splice(novasTarefas.length, 0, dadosNovaTarefa);

      despachar(setColunas({
        ...colunas,
        [coluna.colId]: {
          ...colunas[coluna.colId],
          items: novasTarefas
        }
      }));

      e.target.value = "";
      setNovo(false);
    }
    
    if (e.key === "Escape") {
      e.target.value = "";
      setNovo(false);
    }
  };

  const controlaDel = (e, pos) => {
    const novasTarefas = [...colunas[coluna.colId].items];
    
    e.target.parentNode.className = `${e.target.parentNode.className} excluida`;

    novasTarefas.splice(pos, 1);

    setTimeout(() => {
      despachar(setColunas({
        ...colunas,
        [coluna.colId]: {
          ...colunas[coluna.colId],
          items: novasTarefas
        }
      }));
    }, 201);
  };

  return (
    <Container cor={coluna.coluna.cor.toString()}>
      <Droppable droppableId={coluna.colId} index={index}>
        {(provided, snapshot) => {
          return (
            <Area {...provided.droppableProps} ref={provided.innerRef}>
              <Nome>{coluna.coluna.nome}</Nome>

              {tarefas.map((tarefa, index) => {
                return (
                  <Tarefa
                    key={tarefa.id}
                    tarefa={tarefa}
                    index={index}
                    onClick={(e) => {controlaDel(e, index)}}
                  ></Tarefa>
                );
              })}

              {novo ? (
                <NovaTarefa>
                  <NovoNome
                    autoFocus
                    onKeyDown={controlaTeclas}
                    placeholder="Nova Tarefa..."
                  />
                </NovaTarefa>
              ) : null}

              
              {provided.placeholder}
            </Area>
          );
        }}
      </Droppable>
      <NovaTarefaBtn onClick={controlaClique}>
                <Mais /> Adicionar outro cartão
              </NovaTarefaBtn>
    </Container>
  );
};

export default Coluna;
