import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Container, Quadro, Titulo } from "./style";

import Coluna from "../Coluna";

const itemsFromBackend = [
  { id: "01", content: "First task" },
  { id: "02", content: "Second task" },
  { id: "03", content: "Third task" },
  { id: "04", content: "Fourth task" },
  { id: "05", content: "Fifth task" },
];

const columnsFromBackend = {
  "c01": {
      id: "001",
    name: "Requested",
    items: itemsFromBackend,
  },
  "c02": {
    id: "002",
    name: "To do",
    items: [],
  },
  "c03": {
    id: "003",
    name: "In Progress",
    items: [],
  },
  "c04": {
    id: "004",
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <Container>
      <Titulo>Kanban do projeto</Titulo>

      <Quadro>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map((column, index) => {
              console.log(column[1]);
            return <Coluna coluna={column[1]} index={index} tarefas={column[1].items}></Coluna>;
          })}
        </DragDropContext>
      </Quadro>
    </Container>
  );
};

export default Kanban;
