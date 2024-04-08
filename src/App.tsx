import React, { useState } from "react";
import "./App.css";
import { ToDolist } from "./todolist";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  function addTask(title: string) {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  }
  let taskForToDoList = tasks;
  if (filter === "all") {
    taskForToDoList = tasks;
  }
  if (filter === "completed") {
    taskForToDoList = tasks.filter((task) => task.isDone === true);
  }
  if (filter === "active") {
    taskForToDoList = tasks.filter((task) => task.isDone === false);
  }

  function removeTask(id: string, data: Array<TaskType>) {
    let resultTasks = data.filter((task) => task.id !== id);
    setTasks(resultTasks);
  }
  return (
    <div className="App">
      <ToDolist
        title="What to learn"
        tasks={taskForToDoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
