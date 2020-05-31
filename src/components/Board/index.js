import React, { Component } from 'react';

import { MdAdd } from 'react-icons/md';
import { Form } from 'react-bootstrap';

import { Container } from './styles';
import ModalTask from '../modals/Task';
import Task from '../Task/index';

import api from '../../services/api';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    task: null,
    isOpen: false,
  });

  handleModal = (state, task) => {
    this.setState({
      isOpen: state,
    });
  };

  handleTask = (newTask) => {
    const { task } = this.state;
    this.setState({ task: newTask });
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  async componentDidMount() {
    const tasks = await api.get('/tasks');
    const { data } = tasks;
    this.setState({
      tasks: data,
    });
  }

  render() {
    const { isOpen, task } = this.state;

    return (
      <Container>
        <MdAdd
          size={50}
          color="#E86D39"
          onClick={() => this.handleModal(true, null)}
        />
        <ModalTask
          task={task}
          handleaddtask={this.handleTask}
          show={isOpen}
          onHide={() => this.handleModal(false, null)}
        />
        <Task task={task} handleTask={this.handleTask} />
      </Container>
    );
  }
}

export default Board;
