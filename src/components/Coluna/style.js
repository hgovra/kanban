import styled from "styled-components";

import { cores } from "../../themes/globalStyles";

export const Container = styled.div`
  padding: 20px;
  background-color: ${(props) =>
    props.cor ? cores[props.cor] : "rgba(0, 0, 0, 0.1)"};
  border-radius: 5px;
  border-top: 5px solid rgba(0, 0, 0, 0.1);
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 275px;

  &:first-of-type {
    margin-left: 0;
  }

  &.excluida {
    animation: fadeout 200ms linear forwards;
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
export const Area = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Icone = styled.span`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  display: inline-block;
  cursor: pointer;
`;
export const Nome = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 10px;
`;

export const NovaTarefaBtn = styled.span`
  display: block;
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
`;

export const NovaTarefa = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background: #fff;
  border-radius: 5px;
  margin-top: 10px;
  padding: 15px;
  opacity: 1;
  animation: fadein 200ms linear forwards;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const Mais = styled.div`
  width: 14px;
  height: 14px;
  margin-right: 15px;
  display: inline-block;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    background: #fff;
    width: 2px;
    height: 16px;
    top: 0;
    left: 7px;
  }

  &::after {
    content: "";
    position: absolute;
    background: #fff;
    width: 16px;
    height: 2px;
    top: 7px;
    left: 0;
  }
`;
export const NovoNome = styled.input`
  padding: 0;
  background: none;
  font-family: "Raleway", sans-serif;
  letter-spacing: 0.3px;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  height: 16px;
  width: auto;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: #CCC;
  }
`;
