import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  & > svg {
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 100%;
    position: absolute;
    top: 2px;
    right: 50px;
    transition: all 0.3s ease 0s;

    &:hover {
      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    }
  }
`;
