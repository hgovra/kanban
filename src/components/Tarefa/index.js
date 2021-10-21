import { Draggable } from "react-beautiful-dnd";

import { Container } from "./style";

const Tarefa = (tarefa, index) => {
    //console.log('cc',tarefa);
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
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Tarefa;
