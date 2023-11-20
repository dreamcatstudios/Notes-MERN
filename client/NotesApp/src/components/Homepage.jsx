import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, Button, Card } from "react-bootstrap";
// import useFetchData from "../hooks/useFetchData";
import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState([]);

  const [notes, setNotes] = useState({
    id: "",
    textTitle: "",
    textContent: "",
    textDeleteId: "",
    textUpdateId: "",
    textUpdateTitle: "",
    textUpdateContent: "",
  });

  //Update Data

  const clearText = () => {
    setNotes({
      id: "",
      textTitle: "",
      textContent: "",
      textDeleteId: "",
      textUpdateId: "",
      textUpdateTitle: "",
      textUpdateContent: "",
    });
  };

  const handleUpdateData = async () => {
    try {
      const payload = {
        content: notes.textUpdateContent,
        title: notes.textUpdateTitle,
      };
      const response = await axios.patch(
        `http://localhost:5001/api/notes/${notes.textUpdateId}`,
        payload
      );
      console.log("Update response:", response.data);
      // Fetch data again after successful update
      fetchData();
      alert("Note updated successfully");
      clearText();
    } catch (error) {
      console.error("Error updating note:", error.message);
      alert("Failed to update note. Please try again.");
    }
  };

  //Handle Delete
  const handleDeleteData = async () => {
    try {
      await axios.delete(
        `http://localhost:5001/api/notes/${notes.textDeleteId}`
      );
      alert("Data updated successfully");
      fetchData(); // Fetch data again after deletion
      clearText();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateData = async () => {
    try {
      const uploadData = {
        title: notes.textTitle,
        content: notes.textContent,
      };
      await axios.post("http://localhost:5001/api/notes", uploadData);
      console.log("uploadData: ", uploadData);
      alert("Data added successfully");
      fetchData();
      clearText();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    const result = await axios.get("http://localhost:5001/api/notes");
    console.log(result);
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar bg="dark">
        <Navbar.Brand style={{ color: "white" }} className="m-2" href="#">
          Notes - MERN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <h1>Welcome to MERN-Notes App</h1>
        <p>Perform CRUD operations in MERN stack powered notes app.</p>

        {/* READ OPERATIONS */}
        <Card className="m-4">
          <Card.Body>
            <Card.Title>READ OPERATIONS</Card.Title>
            <br></br>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index}>
                  <p>
                    {" "}
                    <b>Title: </b> {item.title}
                  </p>
                  <p>
                    {" "}
                    <b>Content: </b> {item.content}
                  </p>
                  <p>
                    {" "}
                    <b>Unique Id: </b> {item._id}
                  </p>
                </div>
              ))
            ) : (
              <p>Nothing to show here... Add some notes!</p>
            )}
          </Card.Body>
        </Card>

        {/* CREATE OPERATIONS */}
        <Card className="m-4">
          <Card.Body>
            <Card.Title>CREATE OPERATIONS</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNoteTitle">
                <Form.Label>Note Title</Form.Label>
                <Form.Control
                  type="text"
                  name="textTitle"
                  value={notes.textTitle}
                  onChange={handleChange}
                  placeholder="Enter note title"
                />
                <Form.Label>Note Content</Form.Label>
                <Form.Control
                  type="text"
                  name="textContent"
                  value={notes.textContent}
                  onChange={handleChange}
                  placeholder="Enter note Content"
                />
              </Form.Group>
              <Button onClick={handleCreateData} variant="primary">
                CREATE
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* DELETE OPERATIONS */}
        <Card className="m-4">
          <Card.Body>
            <Card.Title>DELETE OPERATIONS</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNoteTitle">
                <Form.Label>Delete by Id</Form.Label>
                <Form.Control
                  name="textDeleteId"
                  value={notes.textDeleteId}
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter note Id"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleDeleteData}>
                DELETE
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* UPDATE OPERATIONS */}
        <Card className="m-4">
          <Card.Body>
            <Card.Title>UPDATE OPERATIONS</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNoteTitle">
                <Form.Label>Update by ID</Form.Label>
                <Form.Control
                  name="textUpdateId"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter note ID"
                  value={notes.textUpdateId}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNoteTitle">
                <Form.Label>Enter the new Title</Form.Label>
                <Form.Control
                  name="textUpdateTitle"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter your title here"
                  value={notes.textUpdateTitle}
                />
                <Form.Label>Enter the new text</Form.Label>
                <Form.Control
                  name="textUpdateContent"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter your text here"
                  value={notes.textUpdateContent}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdateData}>
                UPDATE
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;
