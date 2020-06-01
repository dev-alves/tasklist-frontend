import React, { Component } from 'react';

import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { FormCheck } from 'react-bootstrap';
import Moment from 'react-moment';

import { Container, ContainerButton, TasksContainer, Finished } from './styles';
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

  handleDelete = async (event, id) => {
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
    const result = await api.put(`/tasks/status/${id}`, {
      statusTask: isChecked ? taskEnum.FINALIZADO : taskEnum.NOVA,
    });

    const { tasks } = this.state;
    const taskId = tasks.findIndex((task) => task.id === result.data.id);

    if (taskId >= 0) {
      tasks[taskId] = result.data;
      this.setState({ tasks: [...tasks] });
    }
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
            <ContainerButton>
              <MdEdit
                size={20}
                color="#E86D39"
                onClick={() => this.handleEdit(task)}
                title="Editar tarefa"
              />
              <MdDeleteForever
                size={20}
                color="#E86D39"
                onClick={(event) => this.handleDelete(event, task.id)}
                title="Excluir tarefa"
              />
            </ContainerButton>
            <h2>{task.titulo}</h2>
            <p>Descrição: {task.descricao}</p>
            <p>Status: {task.status}</p>
            {task.status === 'FINALIZADO' ? (
              <p>
                Finalizado em:{' '}
                <Moment format="DD/MM/YYYY">{task.dataFinal}</Moment>
              </p>
            ) : (
              <p>
                Data de conclusão:{' '}
                <Moment format="DD/MM/YYYY">{task.dataConclusao}</Moment>
              </p>
            )}
            <Finished>
              {task.status === 'CONCLUIDO' ? (
                <span>Concluído</span>
              ) : (
                <span>Finalizar</span>
              )}
              <FormCheck
                type="checkbox"
                checked={task.status === 'FINALIZADO'}
                onChange={(event) => this.handleCheck(event, task)}
              />
            </Finished>
          </TasksContainer>
        ))}
      </Container>
    );
  }
}

export default Task;
