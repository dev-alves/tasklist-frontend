import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin: 20px auto;
  max-width: 520px;
  margin-top: 20px;
  padding: 15px;
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  background: #fff;
  color: '#fff';
  margin: 50px auto;
  width: 420px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 15px;

  h2,
  p {
    display: block;
    width: 100%;
    word-wrap: break-word;
  }

  p {
    margin-bottom: 2px;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const Finished = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  margin-top: 10px;

  span {
    display: block;
    margin-right: 5px;
  }
`;
