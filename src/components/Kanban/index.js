import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Container, Quadro, Titulo } from "./style";

import Coluna from "../Coluna";

const itemsFromBackend = [
  { id: "t01", content: "First task" },
  { id: "t02", content: "Second task" },
  { id: "t03", content: "Third task" },
  { id: "t04", content: "Fourth task" },
  { id: "t05", content: "Fifth task" },
];

const columnsFromBackend = {
  "c01": {
    name: "Requested",
    items: itemsFromBackend,
  },
  "c02": {
    name: "To do",
    items: [],
  },
  "c03": {
    name: "In Progress",
    items: [],
  },
  "c04": {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log('res',result);
  

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    //console.log('sc',columns);
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

    console.log('srcI',columns[source.droppableId].items);
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
    console.log('src3',columns[source.droppableId].items);
  }
};



const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  /*useEffect(() => {
    setColumns(columns);
  }, [columns]);*/

  return (
    <Container>
      <Titulo>Kanban do projeto</Titulo>

      <Quadro>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map((column, index) => {
             return <Coluna colId={column[0]} coluna={column[1]} key={`col-${index}`} index={index} tarefas={column[1].items}></Coluna>;
          })}
        </DragDropContext>
      </Quadro>
    </Container>
  );
};

export default Kanban;
