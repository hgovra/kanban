/**
 *  Componente que cria os cartões de tarefas.
 *  Nada de especial aqui.
 */

import { Draggable } from "react-beautiful-dnd";

import { Container, Excluir, Nome, Tags } from "./style";

const Tarefa = (props) => {
  const { index, tarefa, deletar, selTags } = props;

  return (
    <Draggable draggableId={tarefa.id} index={index}>
      {(provided) => {
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Nome>{tarefa.nome}</Nome>

            <Excluir
              className="excluir-btn"
              title="Excluir"
              onClick={deletar}
            />

            <Tags
              tags={tarefa.tags}
              onChange={(novasTags) => selTags(novasTags)}
              placeholder="Nova Tag..."
            />
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Tarefa;
