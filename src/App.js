import React from 'react';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Board />
      <GlobalStyle />
    </>
  );
}

export default App;
