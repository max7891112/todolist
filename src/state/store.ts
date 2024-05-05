import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { AllTaskType, TaskType, TodolistType } from "../AppWithRedux";
export type AppRootStateType = {
  todolists: TodolistType[];
  tasks: AllTaskType;
};

export const store = configureStore({
  reducer: {
    //@ts-ignore
    todolists: todolistsReducer,
    //@ts-ignore
    tasks: tasksReducer,
  },
});
