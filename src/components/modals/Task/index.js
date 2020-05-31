import React, { Component } from 'react';
import { Container, Col, Modal, Button, Form } from 'react-bootstrap';

import api from '../../../services/api';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task !== null) {
      this.setState({
        titulo: nextProps.task.titulo,
        descricao: nextProps.task.descricao,
        dataConclusao: nextProps.task.dataConclusao,
      });
    }
  }

  getInitialState = () => ({
    titulo: '',
    descricao: '',
    dataConclusao: '',
  });

  resetState = () => {
    this.setState(this.getInitialState());
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { onHide, task } = this.props;
    const { titulo, descricao, dataConclusao } = this.state;

    let data;
    if (task !== null) {
      const result = await api.put(`/tasks/${task.id}`, {
        id: task.id,
        titulo,
        descricao,
        dataConclusao,
      });

      const { status } = result;
      if (status === 200) {
        onHide();
        this.resetState();
        data = result.data;
      }
    } else {
      const result = await api.post('/tasks', {
        titulo,
        descricao,
        dataConclusao,
      });

      const { status } = result;
      if (status === 200) {
        onHide();
        this.resetState();
        data = result.data;
      }
    }

    this.handleTaskToChild(data);
  };

  handleTaskToChild = (task) => {
    if (task !== null) {
      this.props.handleaddtask(task);
    }
  };

  handleTituloChange = (event) => {
    this.setState({ titulo: event.target.value });
  };

  handleDescricaoChange = (event) => {
    this.setState({ descricao: event.target.value });
  };

  handleConclusaoChange = (event) => {
    this.setState({ dataConclusao: event.target.value });
  };

  handleClose = () => {
    const { onHide } = this.props;
    this.resetState();
    onHide();
  };

  render() {
    const { titulo, descricao, dataConclusao } = this.state;
    const { task, onHide } = this.props;

    return (
      <Container>
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {task !== null ? (
            <>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Editar tarefa
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <input type="hidden" value={task.id} />
                  <Form.Row>
                    <Form.Group as={Col} controlId="titulo">
                      <Form.Label>Titulo</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={titulo}
                        onChange={this.handleTituloChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="descricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={descricao}
                      onChange={this.handleDescricaoChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="dataConclusao">
                    <Form.Label>Data de conclusão</Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      value={dataConclusao}
                      onChange={this.handleConclusaoChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={(event) => this.handleSubmit(event)}>
                  Atualizar
                </Button>
                <Button onClick={() => this.handleClose()}>Close</Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Header closeButton>
                <Col>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Adicionar tarefa
                  </Modal.Title>
                </Col>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="titulo">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={titulo}
                      onChange={this.handleTituloChange}
                    />
                  </Form.Group>
                  <Col />
                  <Col>
                    <Form.Group controlId="descricao">
                      <Form.Label>Descrição</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={descricao}
                        onChange={this.handleDescricaoChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group controlId="dataConclusao">
                      <Form.Label>Data de conclusão</Form.Label>
                      <Form.Control
                        type="date"
                        size="sm"
                        value={dataConclusao}
                        onChange={this.handleConclusaoChange}
                      />
                    </Form.Group>
                  </Col>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={(event) => this.handleSubmit(event)}>
                  Salvar
                </Button>
                <Button onClick={() => this.handleClose()}>Close</Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    );
  }
}

export default Task;
