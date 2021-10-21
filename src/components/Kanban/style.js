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
    padding: 20px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 14px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 275px;
`;