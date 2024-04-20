import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
export const AddItemForm: React.FC<{
  addItem(title: string): void;
}> = ({ addItem }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState(false);
  const onNewTaskChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    setError(false);
  };

  const addNewTask = () => {
    if (taskTitle.trim() === "") {
      setError(true);
      return;
    }
    addItem(taskTitle.trim());
    setTaskTitle("");
  };

  const onNewTaskEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewTask();
    }
  };
  return (
    <div>
      <TextField
        label="Write title"
        variant="outlined"
        value={taskTitle}
        size="small"
        onChange={onNewTaskChangeHandler}
        onKeyDown={onNewTaskEnterHandler}
        error={!!error}
        helperText={error ? "Incorrect entry" : ""}
      />
      <IconButton onClick={addNewTask} color="primary" size="small">
        <LocalHospitalIcon />
      </IconButton>
    </div>
  );
};
