import styled from "styled-components";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

export const Container = styled.div`
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    background: #FFF;
    border-radius: 5px;
    margin-top: 10px;
    padding: 15px;

    &:hover > .excluir-btn {
        animation: fadein 100ms linear forwards;
    }

    &.excluida {
        animation: fadeout 200ms linear forwards;
    }

    @keyframes fadein {
        0% {
        opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }

    @keyframes fadeout {
        0% {
        opacity: 1;
        }
        100% {
        opacity: 0;
        }
    }

    & > .react-tag-input {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: auto;
        min-height: 0;
        padding: 0;
        overflow-y: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #FFF;
        border: 0;
        font-size: 12px;
        font-weight: 800;
    }
    & .react-tag-input__input {
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        font-size: 12px;
    }
    & .react-tag-input__input::placeholder {
        color: #CCC;
        opacity: 0;
    }
    & .react-tag-input__input:hover::placeholder {
        opacity: 1;
    }
    & .react-tag-input__tag {
        border-radius: 5px;
        padding-right: 2px;
    }
    
    & .react-tag-input__tag__content {
        padding: 8px 0 8px 10px;
    }
    & .react-tag-input__tag__remove {
        background: none;
        opacity: 0;
    }
    & .react-tag-input__tag:hover .react-tag-input__tag__remove {
        opacity: 1;
    }
    & .react-tag-input__tag__remove::before, .react-tag-input__tag__remove::after {
        background-color: #FFF;
    }
`;

export const Nome = styled.div`
    margin-bottom: 10px;
`;
export const Excluir = styled.div`
    width: 14px;
    height: 14px;
    margin-left: 10px;
    float: right;
    margin-top: -23px;
    opacity: 0;
    position: relative;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        background: #212529;
        width: 2px;
        height: 14px;
        top: 0;
        left: 6px;
        transform: rotate(40deg);
    }

    &::after {
        content: "";
        position: absolute;
        background: #212529;
        width: 14px;
        height: 2px;
        top: 6px;
        left: 0;
        transform: rotate(50deg);
    }
`;

export const Tags = styled(ReactTagInput)`
    border: 0;
`;