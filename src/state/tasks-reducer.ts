import { AllTaskType } from "../App";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";
type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  id: string;
};

type ChangeStatusTaskActionType = {
  type: "CHANGE-STATUS-TASK";
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  newTitle: string;
  todolistId: string;
  taskId: string;
};

type ActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeStatusTaskActionType
  | changeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (
  state: AllTaskType,
  action: ActionsType
): AllTaskType => {
  switch (action.type) {
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const newTask = { id: v1(), title: action.title, isDone: false };
      const task = stateCopy[action.todolistId];
      const newTasks = [...task, newTask];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const resultTasks = tasks.filter((task) => task.id !== action.id);
      stateCopy[action.todolistId] = resultTasks;
      return stateCopy;
    }

    case "CHANGE-STATUS-TASK": {
      const stateCopy = { ...state };
      const changeTask = stateCopy[action.todolistId].find(
        (task) => task.id === action.taskId
      );
      if (changeTask) {
        changeTask.isDone = action.isDone;
      }
      return stateCopy;
    }

    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const task = stateCopy[action.todolistId].find(
        (task) => task.id === action.taskId
      );
      if (task) {
        task.title = action.newTitle;
      }
      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }

    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.id] = [];
      return stateCopy;
    }
    default:
      throw new Error("I don`t understand this action type");
  }
};

export const addTaskAC = (todolistId: string, title: string): ActionsType => {
  return { type: "ADD-TASK", todolistId, title };
};

export const removeTaskAC = (todolistId: string, id: string): ActionsType => {
  return { type: "REMOVE-TASK", todolistId, id };
};

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ActionsType => {
  return { type: "CHANGE-STATUS-TASK", todolistId, taskId, isDone };
};

export const changeTaskTitleAC = (
  newTitle: string,
  todolistId: string,
  taskId: string
): ActionsType => {
  return { type: "CHANGE-TASK-TITLE", newTitle, todolistId, taskId };
};
