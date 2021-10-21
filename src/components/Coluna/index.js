import { Container } from "./style";
import { Droppable } from "react-beautiful-dnd";

import Tarefa from "../Tarefa";

const Coluna = (coluna, index) => {
    //console.log('cols',coluna);
    const tarefas = coluna.coluna.items;

    return (
        <Container>
            <Droppable droppableId={coluna.colId} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {tarefas.map((tarefa, index) => {
                           return (
                            <Tarefa key={tarefa.id} tarefa={tarefa} index={index}></Tarefa>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
            
        </Container>
      
    );
  }
  
  export default Coluna;