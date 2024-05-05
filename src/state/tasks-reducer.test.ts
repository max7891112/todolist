import { v1 } from "uuid";
import { AllTaskType } from "../AppWithRedux";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";
import {
  tasksReducer,
  addTaskAC,
  removeTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from "./tasks-reducer";

test("new task has been successfully added", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: AllTaskType = {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "HTML&CSSer", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
  };

  const action = addTaskAC(todolistId1, "new title");

  const endState = tasksReducer(startState, action);

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId1][0].title).toBe("HTML&CSS");
  expect(endState[todolistId1][2].title).toBe("new title");
  expect(endState[todolistId1][2].isDone).toBe(false);
});

test("task has been successfully removed", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: AllTaskType = {
    [todolistId1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: "1", title: "HTML&CSSer", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
  };

  const action = removeTaskAC(todolistId1, "1");

  const endState = tasksReducer(startState, action);

  expect(endState[todolistId1].length).toBe(1);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe("JS");
  expect(endState[todolistId2][1].title).toBe("JS");
  expect(endState[todolistId1].every((t) => t.id !== "1")).toBeTruthy();
});

test("task status has been successfully changed", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: AllTaskType = {
    [todolistId1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: "1", title: "HTML&CSSer", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
  };

  const action = changeTaskStatusAC(todolistId1, "1", false);

  const endState = tasksReducer(startState, action);

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1][0].isDone).toBe(false);
  expect(endState[todolistId2][0].isDone).toBe(true);
});

test("task title has been successfully changed", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: AllTaskType = {
    [todolistId1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: "1", title: "HTML&CSSer", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
  };

  const action = changeTaskTitleAC("new title", todolistId1, "1");

  const endState = tasksReducer(startState, action);

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId1][0].title).toBe("new title");
  expect(endState[todolistId2][0].title).toBe("HTML&CSSer");
});

test("new array should be added when new todolist is added", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: AllTaskType = {
    [todolistId1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: "1", title: "HTML&CSSer", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
  };

  const action = addTodolistAC("new title");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: AllTaskType = {
    [todolistId1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: "1", title: "HTML&CSSer", isDone: true },
      { id: "2", title: "JS", isDone: true },
    ],
  };

  const action = removeTodolistAC(todolistId1);

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistId1]).toBeUndefined();
});
