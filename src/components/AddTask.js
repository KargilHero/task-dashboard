import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { v4 as uuidv4 } from "uuid"; // Import for unique ID generation

const AddTask = () => {
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(""); // State for validation error
  const dispatch = useDispatch();

  // Handle the browser back button
  useEffect(() => {
    const handlePopState = () => {
      setShowForm(false); // Close the form when back button is pressed
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleAddTask = () => {
    const today = new Date().setHours(0, 0, 0, 0); // Today's date
    const enteredDate = new Date(dueDate).setHours(0, 0, 0, 0); // Entered due date

    // Check if all fields are filled
    if (!title.trim() || !description.trim() || !dueDate) {
      setError("All fields are required.");
      return;
    }

    // Check if the due date is valid and not in the past
    if (isNaN(enteredDate) || enteredDate < today) {
      setError("The due date cannot be in the past.");
      return;
    }

    // Dispatch action and reset form
    setError("");
    dispatch(addTask({ id: uuidv4(), title, description, dueDate }));
    setTitle("");
    setDescription("");
    setDueDate("");
    setShowForm(false); // Hide the form after adding a task
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);

    // If opening the form, push a new state into the history stack
    if (!showForm) {
      window.history.pushState({ formOpened: true }, "");
    } else {
      window.history.back(); // Close form via history stack when toggling off
    }
  };

  return (
    <div>
      {/* Button to toggle the form */}
      <button className="toggle-form-btn" onClick={toggleForm}>
        {showForm ? "NOT NOW" : "Wanna Schedule Your Life"}
      </button>

      {/* Form appears only when showForm is true */}
      {showForm && (
        <div className="add-task-form">
          <h2>Add New Task</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Disable past dates
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
    </div>
  );
};

export default AddTask;
