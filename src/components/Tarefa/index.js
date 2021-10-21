import { Draggable } from "react-beautiful-dnd";

import { Container, Excluir } from "./style";

const Tarefa = (tarefa) => {
  const dados = tarefa.tarefa;
  
  return (
    <Draggable draggableId={dados.id} index={tarefa.index}>
      {(provided, snapshot) => {
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {tarefa.tarefa.content}

            <Excluir title="Excluir" onClick={tarefa.onClick} />
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Tarefa;
