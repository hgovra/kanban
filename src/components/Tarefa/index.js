import { Draggable } from "react-beautiful-dnd";

import { Container, Excluir, Nome, Tags } from "./style";

const Tarefa = (tarefa) => {
  const dados = tarefa.tarefa;

  return (
    <Draggable draggableId={dados.id} index={tarefa.index}>
      {provided => {
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Nome>{tarefa.tarefa.nome}</Nome>

            <Excluir
              className="excluir-btn"
              title="Excluir"
              onClick={tarefa.onClickExcluir}
            />

            <Tags
              tags={tarefa.tarefa.tags}
              onChange={(novasTags) => tarefa.selTags(novasTags)}
              placeholder="Nova Tag..."
            />
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Tarefa;
