import { useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";
type editableSpanPropsType = {
  title: string;
  onChange(newValue: string): void;
};

export function EditableSpan(props: editableSpanPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  return editMode ? (
    <TextField
      value={title}
      onBlur={activateViewMode}
      onChange={onChangeHandler}
      variant="standard"
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
