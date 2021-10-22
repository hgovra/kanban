import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { DragDropContext } from "react-beautiful-dnd";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import {
  Container,
  Quadro,
  Titulo,
  NovaColunaBtn,
  NovoNome,
  NovoNomeColuna,
  Mais,
  NovaColuna,
  PickerContainer,
  NovoIconeColuna,
  PickerBG,
} from "./style";

import Coluna from "../Coluna";

import { setColunas } from "../../reducers/modules/quadro";

const tradPicker = {
  search: "Buscar",
  clear: "Apagar",
  notfound: "Nenhum resultado",
  categories: {
    search: "Resultados da Busca",
    recent: "Frequentemente Usados",
    smileys: "Smileys e Emoções",
    people: "Pessoas e Corpo",
    nature: "Animais e Natureza",
    foods: "Comida e Bebida",
    activity: "Actividade",
    places: "Viagem e Locais",
    objects: "Objetos",
    symbols: "Símbolos",
    flags: "Bandeiras",
    custom: "Personalizado",
  },
  categorieslabel: "Categorias"
};

function Kanban() {
  const despachar = useDispatch();
  const [novo, setNovo] = useState(false);
  const [selIcone, setSelIcone] = useState({
    ativo: false,
    coluna: undefined
  });
  const [posPick, setPosPick] = useState(0);
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

  const controlaSelIcone = (e, col, tar) => {
    setSelIcone({
      ativo: true,
      coluna: col
    });

    const posPicker = e.target.getBoundingClientRect();console.log(posPicker);
    setPosPick(posPicker);
  };

  const controlaMudaIcone = emoji => {
    const col = colunas[selIcone.coluna];

    const novaColuna = {
      ...col,
      icone: emoji.native
    }
    
    despachar(
      setColunas({
        ...colunas,
        [selIcone.coluna]: novaColuna
      })
    );

    setSelIcone({
      ativo: false,
      coluna: undefined
    });
  };

  return (
    <Container>
      <Titulo>Kanban do projeto</Titulo>

      <PickerBG
        className={selIcone.ativo ? "on" : "off"}
        onClick={() => {
          setSelIcone({
            ativo: false,
            coluna: undefined
          });
        }}
        />      

      <Quadro>
      <PickerContainer
          className={selIcone.ativo ? "on" : "off"}
          style={{
            left: `${posPick.left}px`,
            top: `${selIcone.ativo ? 50 : -9999}px`,
          }}
        >
          <Picker
            native={true}
            showPreview={false}
            showSkinTones={false}
            i18n={tradPicker}
            onSelect={(emoji) => controlaMudaIcone(emoji)}
          />
        </PickerContainer>

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
                colIconeSel={controlaMudaIcone}
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
}

export default Kanban;
