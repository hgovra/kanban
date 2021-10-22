/**
 *  Componente pai do kanban.
 *  Monta as colunas "salvas" e prepara
 *  a interface para adicionar novas.
 */

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
  ModalBG,
} from "./style";

import Coluna from "../Coluna";

import { setColunas } from "../../reducers/modules/quadro";

const traducaoPicker = {
  search: "Buscar",
  clear: "Apagar",
  notfound: "Nenhum resultado",
  categories: {
    search: "Resultados da Busca",
    recent: "Frequentemente Usados",
    smileys: "Smileys e Emoções",
    people: "Emojis e Pessoas",
    nature: "Animais e Natureza",
    foods: "Comida e Bebida",
    activity: "Actividade",
    places: "Viagem e Locais",
    objects: "Objetos",
    symbols: "Símbolos",
    flags: "Bandeiras",
    custom: "Personalizado",
  },
  categorieslabel: "Categorias",
};

const Kanban = () => {
  const despachar = useDispatch();

  // Estado para função de adicionar colunas.
  const [novaCol, setNovaCol] = useState(false);

  // Estado para função de mudar o ícone das colunas.
  const [selIcone, setSelIcone] = useState({
    ativo: false,
    coluna: undefined,
  });

  // Estado para posicionar caixa de seleção de ícones.
  const [posPick, setPosPick] = useState(0);

  // Dados das colunas.
  const { colunas } = useSelector(state => state.quadro);

  // Salvar a nova coluna.
  const salvarNovaColuna = e => {
    const texto = e.target.value;
    let ativo = true;

    if (texto) {
      const dadosNovaColuna = {
        icone: "📑",
        nome: texto,
        cor: Object.getOwnPropertyNames(colunas).length % 4,
        tarefas: [],
      };

      despachar(
        setColunas({
          ...colunas,
          [uuidv4()]: dadosNovaColuna,
        })
      );

      e.target.value = "";
      setNovaCol(false);
    } else {
      // É obrigatório digitar um nome para a nova coluna.
      if (ativo) {
        alert("Insira um nome para a nova coluna e pressione Enter.");
        ativo = false;
      }

      setTimeout(() => {
        e.target.focus();
      }, 10);
    }
  };

  // Ajustando o teclado para editar o nome da nova coluna.
  const controlaTeclas = e => {
    // Enter = Salva
    if (e.key === "Enter") {
      salvarNovaColuna(e);
    }

    // Esc = Aborta
    if (e.key === "Escape") {
      e.target.value = "";
      setNovaCol(false);
    }
  };

  // Salvar a posição das tarefas após arrastar e soltar.
  const soltarTarefa = retorno => {
    // Fora do componente (não fazer nada).
    if (!retorno.destination) return;

    const { source, destination } = retorno;

    // Tarefa mudou para outra coluna.
    if (source.droppableId !== destination.droppableId) {
      const colOrigem = colunas[source.droppableId];
      const colDestino = colunas[destination.droppableId];
      const tarefasOrigem = [...colOrigem.tarefas];
      const tarefasDestino = [...colDestino.tarefas];

      const [removed] = tarefasOrigem.splice(source.index, 1);
      tarefasDestino.splice(destination.index, 0, removed);

      despachar(
        setColunas({
          ...colunas,
          [source.droppableId]: {
            ...colOrigem,
            tarefas: tarefasOrigem,
          },
          [destination.droppableId]: {
            ...colDestino,
            tarefas: tarefasDestino,
          },
        })
      );
    } else {
      // Tarefa continua na mesma coluna.
      const coluna = colunas[source.droppableId];
      const novasTarefas = [...coluna.tarefas];

      const [removed] = novasTarefas.splice(source.index, 1);
      novasTarefas.splice(destination.index, 0, removed);

      despachar(
        setColunas({
          ...colunas,
          [source.droppableId]: {
            ...coluna,
            tarefas: novasTarefas,
          },
        })
      );
    }
  };

  // Abrir caixa de seleção de ícone.
  const controlaSelIcone = (e, col) => {
    setSelIcone({
      ativo: true,
      coluna: col,
    });

    // Define a posição da caixa na tela.
    const posPicker = e.target.getBoundingClientRect();
    setPosPick(posPicker);
  };

  // Salvar o ícone escolhido :D
  const controlaMudaIcone = emoji => {
    const col = colunas[selIcone.coluna];

    const novaColuna = {
      ...col,
      icone: emoji.native,
    };

    despachar(
      setColunas({
        ...colunas,
        [selIcone.coluna]: novaColuna,
      })
    );

    setSelIcone({
      ativo: false,
      coluna: undefined,
    });
  };

  return (
    <Container>
      <Titulo>Kanban do projeto</Titulo>

      <ModalBG
        className={selIcone.ativo ? "on" : "off"}
        onClick={() => {
          setSelIcone({
            ativo: false,
            coluna: undefined,
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
            i18n={traducaoPicker}
            onSelect={(emoji) => controlaMudaIcone(emoji)}
          />
        </PickerContainer>

        <DragDropContext onDragEnd={(retorno) => soltarTarefa(retorno)}>
          {Object.entries(colunas).map((coluna, index) => {
            return (
              <Coluna
                key={`col-${index}`}
                index={index}
                codigo={coluna[0]}
                dados={coluna[1]}
                picker={controlaSelIcone}
              ></Coluna>
            );
          })}
        </DragDropContext>

        {novaCol ? (
          <NovaColuna cor={`${Object.getOwnPropertyNames(colunas).length % 4}`}>
            <NovoIconeColuna>📑</NovoIconeColuna>
            <NovoNomeColuna
              autoFocus
              onKeyDown={controlaTeclas}
              onBlur={salvarNovaColuna}
              placeholder="Nova Coluna..."
            />
          </NovaColuna>
        ) : null}

        <NovaColunaBtn>
          <NovoNome
            role="textbox"
            onClick={() => setNovaCol(true)}
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
