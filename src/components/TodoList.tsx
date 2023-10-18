import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, deleteTodo } from "@/store/slice/formSlice";
import { EditModal } from "./EditModal";

type Todo = {
  id: number;
  name: string;
  detail: string;
  date: string;
  time: string;
  createBy: string;
};

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    const selectedTodo = todos.find((todo) => todo.id === id);

    if (selectedTodo) {
      //   console.log("Selected Todo:", selectedTodo);
      setEditTodoId(id);
      setModalOpen(true);
    } else {
      return null;
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    const storedTodos = JSON.parse(localStorage.getItem("todo_items") || "[]");
    const updatedTodos = storedTodos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem("todo_items", JSON.stringify(updatedTodos));
  };

  return (
    <Container className="mt-5">
      {todos.map((todo) => (
        <div className="box-todo" key={todo.id}>
          <Row className="todo-list">
            <span className="todo-datetime">
              {todo.date} : {todo.time}
              <p className="mb-0">create by: {todo.createBy}</p>
            </span>

            <Col xs={12} md={6} lg={10} className="px-0">
              <h2 className="mt-3 mb-4">{todo.name}</h2>
              <p> {todo.detail}</p>
            </Col>
            <Col
              xs={12}
              md={6}
              lg={2}
              className="px-0 d-flex justify-content-between align-items-center"
            >
              <button
                onClick={() => handleEdit(todo.id)}
                className="btn-setting btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="btn-setting btn-delete"
              >
                Delete
              </button>
            </Col>
          </Row>
        </div>
      ))}
      {modalOpen && editTodoId !== null && (
        <EditModal
          showModal={modalOpen}
          handleClose={() => {
            setModalOpen(false);
            setEditTodoId(null);
          }}
          id={editTodoId}
          data={todos.find((todo) => todo.id === editTodoId)}
        />
      )}
    </Container>
  );
};
