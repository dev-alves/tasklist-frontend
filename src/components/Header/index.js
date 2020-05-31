import React from 'react';

import { Container } from './styles';
import Logo from '../../assets/supero_cor.svg';

function Header() {
  return (
    <Container>
      <h1>Taskfy</h1>
      <img src={Logo} alt="Supero TI" />
    </Container>
  );
}

export default Header;
