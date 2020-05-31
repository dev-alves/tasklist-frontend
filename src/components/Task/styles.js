import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex: 1;
  margin: 20px auto;
  width: 720px;
  margin-top: 20px;
  padding: 15px;
`;

export const TasksContainer = styled.div`
  display: flex;
  position: relative;
  background: #fff;
  color: '#fff';
  margin: 20px auto;
  width: 720px;
  border-radius: 5px;
  margin-top: 20px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);

  h2 {
    width: 100%;
  }
`;

export const ContainerButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 20px;
  right: 20px;

  svg {
    cursor: pointer;
  }
`;
