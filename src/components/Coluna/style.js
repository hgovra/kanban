import styled from "styled-components";

const cores = ['#5CC4FF', '#945AD1', '#59D090', '#ee9a39'];

export const Container = styled.div`
    padding: 20px;
    background-color: ${props => props.cor ? cores[props.cor] : "rgba(0, 0, 0, 0.1)"};
    border-radius: 5px;
    border-top: 5px solid rgba(0, 0, 0, 0.1);
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 275px;

    &:first-of-type {
      margin-left: 0;
    }
`;

export const Area = styled.div`
  min-height: 300px;
`;

export const Nome = styled.h2`
    font-size: 18px;
    font-weight: 800;
    color: #FFF;
    margin-bottom: 20px;
`;