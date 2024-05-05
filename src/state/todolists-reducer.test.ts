import {
  todolistsReducer,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} from "./todolists-reducer";
import { TodolistType } from "../AppWithRedux";
import { v1 } from "uuid";

test("correct todolist should be removed", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to Jest", filter: "all" },
    { id: todolistId2, title: "What to buy Jest", filter: "all" },
  ];

  const action = removeTodolistAC(todolistId1);

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
  expect(endState[0].title).toBe("What to buy Jest");
});

test("the correct title of the todolist should be changed", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to Jest", filter: "all" },
    { id: todolistId2, title: "What to buy Jest", filter: "all" },
  ];

  const action = changeTodolistTitleAC(todolistId1, "new title");

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toBe(todolistId1);
  expect(endState[0].title).toBe("new title");
  expect(endState[1].title).toBe("What to buy Jest");
});

test("new todolist has been successfully added", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to Jest", filter: "all" },
    { id: todolistId2, title: "What to buy Jest", filter: "all" },
  ];

  const action = addTodolistAC("new title");

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("new title");
});

test("correct filter of todolist should be changed", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to Jest", filter: "all" },
    { id: todolistId2, title: "What to buy Jest", filter: "all" },
  ];

  const action = changeTodolistFilterAC(todolistId1, "completed");

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe("What to Jest");
  expect(endState[0].filter).toBe("completed");
  expect(endState[1].filter).toBe("all");
});
