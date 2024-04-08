import React, { useState } from "react";
import { TaskType } from "./App";
import { FilterValuesType } from "./App";

export const ToDolist: React.FC<{
  title: string;
  tasks: TaskType[];
  removeTask(id: string, data: Array<TaskType>): void;
  changeFilter(value: FilterValuesType): void;
  addTask(title: string): void;
}> = ({ title, tasks, removeTask, changeFilter, addTask }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTask(taskTitle);
              setTaskTitle("");
            }
          }}
        />
        <button
          onClick={() => {
            addTask(taskTitle);
            setTaskTitle("");
          }}
        >
          +
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button
              onClick={() => {
                removeTask(task.id, tasks);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
