//import { Container } from "./style";
import { Draggable } from "react-beautiful-dnd";

const Tarefa = (tarefa, index) => {
  return (
    <Draggable key={tarefa.id} draggableId={tarefa.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
              color: "white",
              ...provided.draggableProps.style,
            }}
          >
            {tarefa.content}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Tarefa;
