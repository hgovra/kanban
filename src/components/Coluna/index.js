import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  Area,
  Container,
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
  const { colunas } = useSelector(
    (state) => state.quadro
  );

  const controlaClique = () => {
    setNovo(true);

    /*const inputIdent = 'nova-' + coluna.colId;
    const inputNovoNome = document.getElementById(inputIdent.toString());*/
  };

  const controlaTeclas = (e) => {
    if (e.key === "Enter") {
      //console.log('items',colunas[coluna.colId].items);

      const novasTarefas = [...colunas[coluna.colId].items];
      const dadosNovaTarefa = {
        id: uuidv4(),
        content: e.target.value
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
                  ></Tarefa>
                );
              })}

              {novo ? (
                <NovaTarefa>
                  <NovoNome
                    autoFocus
                    onKeyPress={controlaTeclas}
                    //id={`nova-${coluna.colId}`}
                    placeholder="Nova Tarefa..."
                  />
                </NovaTarefa>
              ) : null}

              <NovaTarefaBtn onClick={controlaClique}>
                Adicionar outro cartão
              </NovaTarefaBtn>
              {provided.placeholder}
            </Area>
          );
        }}
      </Droppable>
    </Container>
  );
};

export default Coluna;
