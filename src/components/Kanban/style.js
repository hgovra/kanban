import styled from "styled-components";

import { cores } from "../../themes/globalStyles";

export const Container = styled.main`
  padding: 60px;
`;

export const Titulo = styled.h1`
  font-weight: 800;
  font-size: 32px;
  margin-bottom: 60px;
`;

export const IconeContainer = styled.div`
  position: absolute;
  margin-top: 40px;
  z-index: 999;
`;

export const Quadro = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: self-start;
`;

export const NovaColuna = styled.div`
  padding: 20px;
  background-color: ${(props) =>
    props.cor ? cores[props.cor] : "rgba(0, 0, 0, 0.1)"};
  border-radius: 5px;
  border-top: 5px solid rgba(0, 0, 0, 0.1);
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 275px;
`;
export const NovoIconeColuna = styled.span`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  display: inline-block;
  font-size: 18px;
`;
export const NovoNomeColuna = styled.input`
  padding: 0;
  background: none;
  font-family: "Raleway", sans-serif;
  letter-spacing: 0.3px;
  font-weight: 800;
  font-size: 18px;
  border: 0;
  height: 21px;
  width: auto;
  color: #FFF;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const NovaColunaBtn = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 315px;
  padding-right: 60px;
`;
export const Mais = styled.div`
    width: 14px;
    height: 14px;
    margin-right: 10px;
    display: inline-block;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        background: #212529;
        width: 2px;
        height: 16px;
        top: 0;
        left: 7px;
    }

    &::after {
        content: "";
        position: absolute;
        background: #212529;
        width: 16px;
        height: 2px;
        top: 7px;
        left: 0;
    }
`;
export const NovoNome = styled.span`
  padding: 20px;
  display: block;
  background: rgba(0, 0, 0, 0.1);
  font-family: "Raleway", sans-serif;
  letter-spacing: 0.3px;
  font-weight: 600;
  font-size: 14px;
  border: 0;
  border-radius: 5px;
  height: 14px;
  width: 275px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
