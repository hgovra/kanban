import { Area, Container, Nome } from "./style";
import { Droppable } from "react-beautiful-dnd";

import Tarefa from "../Tarefa";

const Coluna = (coluna, index) => {
  console.log(coluna.index);
  const tarefas = coluna.coluna.items;

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
              {provided.placeholder}
            </Area>
          );
        }}
      </Droppable>
    </Container>
  );
};

export default Coluna;
