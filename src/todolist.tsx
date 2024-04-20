import React from "react";
import { TaskType } from "./App";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./addItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Checkbox } from "@mui/material";
export const ToDolist: React.FC<{
  id: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  removeTask(id: string, todolistId: string): void;
  changeFilter(value: FilterValuesType, todolistId: string): void;
  addTask(title: string, todolistId: string): void;
  changeStatus(taskId: string, isDone: boolean, todolistId: string): void;
  removeTodolist(todolistId: string): void;
  changeTaskTitle(newValue: string, taskId: string, todolistId: string): void;
  changeTitleTodolist(title: string, id: string): void;
}> = ({
  id,
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  filter,
  removeTodolist,
  changeTaskTitle,
  changeTitleTodolist,
}) => {
  const onAllClickHandler = () => changeFilter("all", id);
  const onActiveClickHandler = () => changeFilter("active", id);
  const onCompletedClickHandler = () => changeFilter("completed", id);

  const addItem = (title: string) => {
    addTask(title, id);
  };

  const changeTitle = (title: string) => {
    changeTitleTodolist(title, id);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          <EditableSpan title={title} onChange={changeTitle} />
        </h3>
        <IconButton
          onClick={() => {
            removeTodolist(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <AddItemForm addItem={addItem}></AddItemForm>
      <ul>
        {tasks.map((task) => {
          const onRemoveHandler = () => removeTask(task.id, id);
          const onChangeTitleHandler = (newValue: string) => {
            changeTaskTitle(newValue, task.id, id);
          };
          return (
            <li key={task.id}>
              <Checkbox
                checked={task.isDone}
                onChange={(event) => {
                  changeStatus(task.id, event.currentTarget.checked, id);
                }}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <IconButton onClick={onRemoveHandler}>
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color="success"
          variant={filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          onClick={onCompletedClickHandler}
          variant={filter === "completed" ? "contained" : "text"}
          color="secondary"
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
