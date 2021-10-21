import { Container } from "./style";
import { Droppable } from "react-beautiful-dnd";

const Coluna = (coluna, index) => {
    const tarefas = coluna.coluna.items;

    return (
        <Container>
            <Droppable droppableId={coluna.id} key={index}>
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
                            <li key={index}></li>
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