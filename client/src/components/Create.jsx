import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

export default function Create() {
  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const handleAdd = () => {
    axios
      .post('http://localhost:3000/add', { title: title, description: description , userId:currentUser._id})
      .then((result) => location.reload())
      .catch((err) => console.log(err));
  };
  console.log({description});

  return (
    <div className="flex flex-col">
      <TextInput
        type="text"
        placeholder="Enter Task"
        className="pb-1"
        onChange={(e) => setTitle(e.target.value)}  
      />
      <TextInput
        type="text"
        placeholder="Enter Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        gradientDuoTone="purpleToBlue" 
        type="button"
        className="mt-2 mb-8"
        outline
        onClick={handleAdd}
      >
        Add
      </Button>
    </div>
  );
}
