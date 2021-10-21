//import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DragDropContext } from "react-beautiful-dnd";

import { Container, Quadro, Titulo, ColunaVazia } from "./style";

import Coluna from "../Coluna";

import {
    setColunas
  } from "../../reducers/modules/quadro";

const Kanban = () => {
    const dispatch = useDispatch();
  const { colunas } = useSelector(
    (state) => state.quadro
  );
  
  /*useEffect(() => {
      console.log(colunas);
    dispatch(setColunas(colunas));
  }, [colunas, dispatch]);*/

  const onDragEnd = (result, colunas, setColunas) => {
    if (!result.destination) return;
    const { source, destination } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = colunas[source.droppableId];
      const destColumn = colunas[destination.droppableId];
  
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      dispatch(setColunas({
        ...colunas,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    } else {
      const coluna = colunas[source.droppableId];
      const copiedItems = [...coluna.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      dispatch(setColunas({
        ...colunas,
        [source.droppableId]: {
          ...coluna,
          items: copiedItems
        }
      }));
    }
  };

  return (
    <Container>
      <Titulo>Kanban do projeto</Titulo>

      <Quadro>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, colunas, setColunas)}
        >
          {Object.entries(colunas).map((coluna, index) => {
            return <Coluna colId={coluna[0]} coluna={coluna[1]} key={`col-${index}`} index={index} tarefas={coluna[1].items}></Coluna>;
          })}
        </DragDropContext>

        <ColunaVazia>
          Adicionar outra lista
        </ColunaVazia>
      </Quadro>
    </Container>
  );
};

export default Kanban;
