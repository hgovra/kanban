import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { DragDropContext } from "react-beautiful-dnd";

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import {
  Container,
  Quadro,
  Titulo,
  NovaColunaBtn,
  NovoNome,
  NovoNomeColuna,
  Mais,
  NovaColuna,
  IconeContainer,
  NovoIconeColuna,
} from "./style";

import Coluna from "../Coluna";

import { setColunas } from "../../reducers/modules/quadro";

const Kanban = () => {
  const despachar = useDispatch();
  const [novo, setNovo] = useState(false);
  const [icone, setIcone] = useState(false);
  const { colunas } = useSelector((state) => state.quadro);

  const colsN = Object.getOwnPropertyNames(colunas);

  const controlaClique = () => {
    setNovo(true);
  };

  const controlaTeclas = (e) => {
    if (e.key === "Enter") {
      const dadosNovaColuna = {
        icone: "📝",
        nome: e.target.value,
        cor: colsN.length % 4,
        items: [],
      };

      despachar(
        setColunas({
          ...colunas,
          [uuidv4()]: dadosNovaColuna,
        })
      );

      e.target.value = "";
      setNovo(false);
    }
    
    if (e.key === "Escape") {
      e.target.value = "";
      setNovo(false);
    }
  };

  const onDragEnd = (result, colunas, setColunas) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = colunas[source.droppableId];
      const destColumn = colunas[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      despachar(
        setColunas({
          ...colunas,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        })
      );
    } else {
      const coluna = colunas[source.droppableId];
      const copiedItems = [...coluna.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      despachar(
        setColunas({
          ...colunas,
          [source.droppableId]: {
            ...coluna,
            items: copiedItems,
          },
        })
      );
    }
  };

  const controlaSelIcone = () => {
    setIcone(true);
  }

  return (
    <Container>
      <Titulo>Kanban do projeto</Titulo>

      <IconeContainer>
        <Picker native={true} showPreview={false} showSkinTones={false} onSelect={emoji => console.log(emoji)} />
      </IconeContainer>

      

      <Quadro>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, colunas, setColunas)}
        >
          {Object.entries(colunas).map((coluna, index) => {
            return (
              <Coluna
                colId={coluna[0]}
                coluna={coluna[1]}
                key={`col-${index}`}
                index={index}
                colIconeClick={controlaSelIcone}
                colIconeSel={null}
              ></Coluna>
            );
          })}
        </DragDropContext>

        {novo ? (
          <NovaColuna cor={(colsN.length % 4).toString()}>
            <NovoIconeColuna>📝</NovoIconeColuna>
            <NovoNomeColuna
              autoFocus
              onKeyDown={controlaTeclas}
              placeholder="Nova Coluna..."
            />
          </NovaColuna>
        ) : null}

        <NovaColunaBtn>
          <NovoNome
            role="textbox"
            onClick={controlaClique}
            placeholder="Adicionar outra lista"
          >
            <Mais /> Adicionar outra lista
          </NovoNome>
        </NovaColunaBtn>
      </Quadro>
    </Container>
  );
};

export default Kanban;
