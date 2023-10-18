import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editTodo } from "@/store/slice/formSlice";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  id: number;
  data: Todo | undefined;
}

type Todo = {
  id: number;
  name: string;
  detail: string;
  date: string;
  time: string;
  createBy: string;
};

type FormType = {
  name: string;
  detail: string;
  date: string;
  time: string;
  createBy: string;
};

export const EditModal = ({ showModal, handleClose, id, data }: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormType>({
    name: data?.name || "",
    detail: data?.detail || "",
    date: data?.date || "",
    time: data?.time || "",
    createBy: data?.createBy || "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        detail: data.detail,
        date: data.date,
        time: data.time,
        createBy: data.createBy,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(editTodo({ id, ...formData }));
    const storedTodos = JSON.parse(localStorage.getItem("todo_items") || "[]");
    const updatedTodos = storedTodos.map((todo: Todo) =>
      todo.id === id ? { ...todo, ...formData } : todo
    );

    localStorage.setItem("todo_items", JSON.stringify(updatedTodos));
    handleClose();
  };

  const formList = [
    {
      id: 1,
      name: "name",
      type: "text",
      value: formData.name,
      placeholder: "Enter task name",
    },
    {
      id: 2,
      name: "detail",
      type: "text",
      value: formData.detail,
      placeholder: "Enter task detail",
    },
    {
      id: 3,
      name: "date",
      type: "date",
      value: formData.date,
      placeholder: "Enter task date",
    },
    {
      id: 4,
      name: "time",
      type: "time",
      value: formData.time,
      placeholder: "Enter task time",
    },
    {
      id: 5,
      name: "createBy",
      type: "text",
      value: formData.createBy,
      placeholder: "Enter task created by",
    },
  ];

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {formList.map((form) => (
            <Form.Group className="mb-3" key={form.id}>
              <Form.Control
                type={form.type}
                name={form.name}
                value={form.value}
                placeholder={form.placeholder}
                onChange={handleChange}
              />
            </Form.Group>
          ))}

          <Button type="submit" className="btn-create w-100">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
