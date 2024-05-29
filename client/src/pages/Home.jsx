import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "../components/Create";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { Button, Modal, TextInput, Label, Textarea } from "flowbite-react";
import { useSelector } from 'react-redux';



export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [todos, setTodos] = useState([]);
  const [editedId, setEditedId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const userTodos = todos.filter(todo => todo.userId === currentUser._id);

  const handleEdit = (todo) => {
    setEditedId(todo._id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setShowModal(true);
  };

  const handleEditSubmit = () => {
    axios
      .put(`http://localhost:3000/update/${editedId}`, {
        title: editedTitle,
        description: editedDescription,
      })
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === editedId ? result.data : todo
          )
        );
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">To Do List</h2>
      </div>
      <Create />
      {todos.length === 0 ? (
        <div className="text-center py-6">
          <h2 className="text-xl text-gray-500">No record</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {userTodos.map((todo) => (
            <div
              key={todo._id}
              className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex justify-between">
                <div className="flex flex-col dark:text-slate-500">
                  <span className="font-semibold">{todo.title}</span>
                  <span className="text-sm font-extralight mb-4">
                    {todo.description}
                  </span>
                </div>
                <div className="flex">
                  <Button
                  className="dark:text-slate-500"
                    color="primary"
                    onClick={() => handleEdit(todo)}
                  >
                    <HiPencilAlt className="h-5 w-5" />
                  </Button>
                  <Button className="text-red-600" color="primary" onClick={() => handleDelete(todo._id)}>
                    <HiTrash className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Edit Todo</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <TextInput
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditSubmit}>Submit</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
