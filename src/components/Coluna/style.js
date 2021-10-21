import styled from "styled-components";

export const Container = styled.div`
    width: 315px;
    min-height: 54px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-left: 20px;
    border-top: 5px solid rgba(0, 0, 0, 0.1);

    &:first-of-type {
      margin-left: 0;
    }
`;