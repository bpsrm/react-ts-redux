import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, selectTodos } from "@/store/slice/formSlice";

type Props = {
  showModal: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateModal = ({ showModal, setModalState }: Props) => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const getNextId = () => {
    const maxId = todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0
    );
    return maxId + 1;
  };

  const handleClose = () => {
    setModalState(false);
  };

  type FormType = {
    name: string;
    detail: string;
    date: string;
    time: string;
    createBy: string;
  };

  const [formData, setFormData] = useState<FormType>({
    name: "",
    detail: "",
    date: "",
    time: "",
    createBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // console.log(formData);
    const newTodo = {
      id: getNextId(),
      ...formData,
    };

    const existingItems = JSON.parse(
      localStorage.getItem("todo_items") || "[]"
    );

    const updatedItems = [...existingItems, newTodo];

    localStorage.setItem("todo_items", JSON.stringify(updatedItems));

    dispatch(addTodo(newTodo));
    setFormData({
      name: "",
      detail: "",
      date: "",
      time: "",
      createBy: "",
    });
    setModalState(false);
  };

  const formFields = [
    {
      type: "text",
      name: "name",
      placeholder: "Enter task name ...",
    },
    {
      type: "text",
      name: "detail",
      placeholder: "Enter task detail ...",
    },
    {
      type: "date",
      name: "date",
      placeholder: "Enter task date alert ...",
    },
    {
      type: "time",
      name: "time",
      placeholder: "Enter task time alert ...",
    },
    {
      type: "text",
      name: "createBy",
      placeholder: "Enter task created by ...",
    },
  ];

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <Form.Group key={field.name} className="mb-3">
              <Form.Control
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof FormType]}
                placeholder={field.placeholder}
                onChange={handleChange}
                className="me-3"
                required
              />
            </Form.Group>
          ))}
          <Button type="submit" className="btn-create w-100">
            Create Items
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
