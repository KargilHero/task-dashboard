import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { deleteTask, markCompleted, reorderTasks } from "../redux/taskSlice";
import ConfirmDialog from "./ConfirmDialog";
import SearchBar from "./SearchBar"; // Import the SearchBar component

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  // Function to handle the search functionality
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm); // Update the search term state
  };

  useEffect(() => {
    // Filter tasks based on search term and filter selection
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply the filter after searching
    if (filter === "Completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter === "Pending") {
      filtered = filtered.filter((task) => !task.completed);
    } else if (filter === "Overdue") {
      filtered = filtered.filter(
        (task) => new Date(task.dueDate) < new Date() && !task.completed
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filter]); // Re-run effect whenever tasks, searchTerm, or filter change

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderTasks(items));
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id));
      setTaskToDelete(null);
    }
    setOpenDialog(false);
  };

  return (
    <>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => {
                if (!task || !task.id) return null;
                return (
                  <Draggable
                    key={task.id.toString()}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="task"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Due: {task.dueDate}</p>
                        <button
                        onClick={() => dispatch(markCompleted(task.id))}
                        className={task.completed ? "undo" : "Go"}>
                          {task.completed ? "Undo" : "Complete"}
                          </button>
                        <button onClick={() => handleDelete(task)} className="stop">Delete</button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
};

export default TaskList;
