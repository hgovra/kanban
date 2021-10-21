import styled from "styled-components";

export const Container = styled.div`
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    background: #FFF;
    border-radius: 5px;
    margin-top: 10px;
    padding: 15px;

    &:hover > div {
        opacity: 1;
    } 
`;

export const Excluir = styled.div`
    width: 14px;
    height: 14px;
    margin-left: 10px;
    float: right;
    opacity: 0;
    position: relative;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        background: #212529;
        width: 2px;
        height: 16px;
        top: 0;
        left: 7px;
        transform: rotate(40deg);
    }

    &::after {
        content: "";
        position: absolute;
        background: #212529;
        width: 16px;
        height: 2px;
        top: 7px;
        left: 0;
        transform: rotate(50deg);
    }
`;