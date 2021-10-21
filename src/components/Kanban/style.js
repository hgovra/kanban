import styled from "styled-components";

export const Container = styled.main`
    padding: 60px;
`;

export const Titulo = styled.h1`
    font-weight: 800;
    font-size: 32px;
    margin-bottom: 60px;
`;

export const Quadro = styled.div` 
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

export const ColunaVazia = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 315px;
    padding-right: 60px;
`;
export const NovoNome = styled.input`
    padding: 20px;
    background: rgba(0, 0, 0, 0.1);
    font-family: 'Raleway', sans-serif;
    letter-spacing: 0.3px;
    font-weight: 600;
    font-size: 14px;
    border: 0;
    border-radius: 5px;
    height: 14px;
    width: 275px;

    &:focus {
        outline: none;
    }
`;