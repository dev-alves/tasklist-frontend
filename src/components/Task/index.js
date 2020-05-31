import React, { Component } from 'react';

import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { Form } from 'react-bootstrap';

import { Container, TasksContainer, ContainerButton } from './styles';
import ModalTask from '../modals/Task';
import taskEnum from '../../config/task';

import api from '../../services/api';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    tasks: [],
    task: null,
    isOpen: false,
  });

  async componentDidMount() {
    const tasks = await api.get('/tasks');
    const { data } = tasks;
    this.setState({
      tasks: data,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task) {
      const { tasks } = this.state;
      const { task } = nextProps;
      const { id } = task;
      const taskId = tasks.findIndex((task) => task.id === id);

      if (taskId >= 0) {
        tasks[taskId] = task;
        this.setState({ tasks: [...tasks] });
      } else {
        this.setState({ tasks: [...tasks, task] });
      }

      const { handleTask } = this.props;
      handleTask(null);
    }
  }

  handleModal = (state, task) => {
    this.setState({
      isOpen: state,
      task: task !== null ? task : null,
    });
  };

  handleDelete = async (id) => {
    const result = await api.delete(`/tasks/${id}`);
    const { status } = result;
    const { tasks } = this.state;

    if (status === 204) {
      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex >= 0) {
        tasks.splice(taskIndex, 1);
        this.setState({
          tasks: [...tasks],
        });
      }
    }
  };

  handleEdit = async (task) => {
    this.handleModal(true, task);
  };

  handleEditTask = (task) => {
    const { tasks } = this.state;
    const { id } = task;
    const taskId = tasks.findIndex((task) => task.id === id);

    if (taskId >= 0) {
      tasks[taskId] = task;
      this.setState({ tasks: [...tasks] });
    } else {
      this.setState({ tasks: [...tasks, task] });
    }
  };

  handleCheck = async (event, task) => {
    const isChecked = event.target.checked;

    const { id } = task;
    const result = await api.put(`/tasks/${id}`, {
      ...task,
      status: isChecked ? taskEnum.CONCLUIDO : taskEnum.EM_ANDAMENTO,
    });
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  render() {
    const { isOpen, tasks, task } = this.state;

    return (
      <Container>
        <ModalTask
          task={task}
          handleaddtask={this.handleEditTask}
          show={isOpen}
          onHide={() => this.handleModal(false, null)}
        />

        {tasks.map((task) => (
          <TasksContainer key={task.id}>
            <h2>{task.titulo}</h2>
            <p>{task.descricao}</p>
            <ContainerButton>
              <MdDeleteForever
                size={22}
                color="#black"
                onClick={() => this.handleDelete(task.id)}
              />
              <MdModeEdit
                size={22}
                color="#black"
                onClick={() => this.handleEdit(task)}
              />
              {task.status}
              <Form.Group controlId="checkTask">
                <Form.Check
                  type="checkbox"
                  checked={task.status === taskEnum.CONCLUIDO}
                  onChange={(event) => this.handleCheck(event, task)}
                />
              </Form.Group>
            </ContainerButton>
          </TasksContainer>
        ))}
      </Container>
    );
  }
}

export default Task;
