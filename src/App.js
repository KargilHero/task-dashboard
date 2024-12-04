import React from "react";
import AddTask from "./components/AddTask";
import FilterNav from "./components/FilterNav";
import SearchBar from "./components/SearchBar";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Task Dashboard</h1>
      <AddTask />
      <FilterNav />
      <TaskList />
    </div>
  );
};

export default App;
