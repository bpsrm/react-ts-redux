import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { CreateModal } from "@/components/CreateModal";
import { TodoList } from "./TodoList";

export const FormCreate = () => {
  const [showModal, setModalState] = useState(false);

  const handleAddTask = () => {
    setModalState(true);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="px-0">
          <Button className="btn-create" onClick={handleAddTask}>
            Add Task
          </Button>
          <CreateModal showModal={showModal} setModalState={setModalState} />
          <TodoList />
        </Col>
      </Row>
    </Container>
  );
};
