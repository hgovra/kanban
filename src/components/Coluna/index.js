/**
 *  Componente que cria as colunas.
 *  Além de mostrar as tarefas existentes,
 *  ele ainda disponibiliza a função para
 *  adicionar mais.
 */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { Droppable } from "react-beautiful-dnd";

import {
  Area,
  Container,
  Icone,
  Mais,
  Nome,
  NovaTarefa,
  NovaTarefaBtn,
  NovoNome,
} from "./style";

import Tarefa from "../Tarefa";

import { setColunas } from "../../reducers/modules/quadro";

const Coluna = (props) => {
  const despachar = useDispatch();

  // Dados enviados pelo Kanban
  const { index, codigo, picker } = props;
  const { nome, cor, icone } = props.dados;
  const tarObj = { ...props.dados.tarefas };
  const tarefas = Object.keys(tarObj).map((k) => tarObj[k]);

  // Estado para função de adicionar tarefas.
  const [novaTar, setNovaTar] = useState(false);

  // Dados das colunas novamente.
  const { colunas } = useSelector((state) => state.quadro);

  // Salvar a nova tarefa (mesma lógica da coluna)
  const salvarNovaTarefa = (e) => {
    const texto = e.target.value;
    let ativo = true;

    if (texto) {
      const novasTarefas = [...tarefas];
      const dadosNovaTarefa = {
        id: uuidv4(),
        nome: e.target.value,
        tags: [],
      };

      novasTarefas.splice(novasTarefas.length, 0, dadosNovaTarefa);

      /*
       * Embora estejamos editando apenas a tarefa,
       * a função para salvar no Redux é a mesma das colunas.
       */
      despachar(
        setColunas({
          ...colunas,
          [codigo]: {
            ...colunas[codigo],
            tarefas: novasTarefas,
          },
        })
      );

      e.target.value = "";
      setNovaTar(false);
    } else {
      // É obrigatório digitar um nome para a nova tarefa.
      if (ativo) {
        alert("Insira um nome para a nova tarefa e pressione Enter.");
        ativo = false;
      }

      setTimeout(() => {
        e.target.focus();
      }, 10);
    }
  };

  //  Teclado
  const controlaTeclas = (e) => {
    if (e.key === "Enter") {
      salvarNovaTarefa(e);
    }

    if (e.key === "Escape") {
      e.target.value = "";
      setNovaTar(false);
    }
  };

  // Deletar uma tarefa
  const controlaDel = (e, index) => {
    const novasTarefas = tarefas;

    // Fade Out (apenas visual)
    e.target.parentNode.className = `${e.target.parentNode.className} excluida`;

    novasTarefas.splice(index, 1);

    setTimeout(() => {
      despachar(
        setColunas({
          ...colunas,
          [index]: {
            ...colunas[index],
            tarefas: novasTarefas,
          },
        })
      );
    }, 210); // Espera o Fade Out terminar
  };

  // Editar as tags das tarefas
  const controlaTags = (tarefa, tags) => {
    const novasTarefas = [...tarefas];

    const editTarefa = novasTarefas[tarefa];
    editTarefa.tags = tags;

    novasTarefas.splice(tarefa, 1, editTarefa);

    despachar(
      setColunas({
        ...colunas,
        [codigo]: {
          ...colunas[codigo],
          tarefas: novasTarefas,
        },
      })
    );
  };

  return (
    <Container cor={`${cor}`} className={`coluna-cor-${cor}`}>
      <Droppable droppableId={codigo} index={index}>
        {(provided, snapshot) => {
          return (
            <Area
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                opacity: snapshot.isDraggingOver ? 0.8 : 1,
              }}
            >
              <Nome>
                <Icone
                  title="Escolher Ícone"
                  onClick={(e) => picker(e, codigo)}
                >
                  {icone}
                </Icone>
                {nome}
              </Nome>

              {tarefas.map((tarefa, index) => {
                return (
                  <Tarefa
                    key={tarefa.id}
                    tarefa={tarefa}
                    index={index}
                    deletar={(e) => {
                      controlaDel(e, index);
                    }}
                    selTags={(tags) => {
                      controlaTags(index, tags);
                    }}
                  ></Tarefa>
                );
              })}

              {novaTar ? (
                <NovaTarefa>
                  <NovoNome
                    autoFocus
                    onKeyDown={controlaTeclas}
                    placeholder="Nova Tarefa..."
                    onBlur={salvarNovaTarefa}
                  />
                </NovaTarefa>
              ) : null}

              {provided.placeholder}
            </Area>
          );
        }}
      </Droppable>
      <NovaTarefaBtn
        onClick={() => {
          setNovaTar(true);
        }}
      >
        <Mais /> Adicionar outro cartão
      </NovaTarefaBtn>
    </Container>
  );
};

export default Coluna;
