import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 70px;
  text-align: center;
`;

export const ModulesWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  button {
    background-color: #ddc08a;
    width: 300px;
    height: 300px;
    color: #00000082;
    font-size: 24px;
    font-weight: bold;
  }

  button:hover {
    background-color: #e7e7e7;
  }
`;
