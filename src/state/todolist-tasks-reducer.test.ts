import { addTodolistAC, todolistsReducer } from "./todolists-reducer";
import { AllTaskType, TodolistType } from "../App";
import { tasksReducer } from "./tasks-reducer";

test("ids should be equals", () => {
  const startTasksState: AllTaskType = {};
  const startTodolistsState: TodolistType[] = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.id);
  expect(idFromTodolist).toBe(action.id);
});
