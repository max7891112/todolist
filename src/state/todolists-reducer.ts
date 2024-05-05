import { TodolistType } from "../AppWithRedux";
import { FilterValuesType } from "../AppWithRedux";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  id: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodolistType[] = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to buy", filter: "all" },
];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.id);
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
        return [...state];
      }
      return state;
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
        return [...state];
      }
      return state;
    }
    case "ADD-TODOLIST": {
      const todolist: TodolistType = {
        id: action.id,
        title: action.title,
        filter: "all",
      };
      return [...state, todolist];
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, id: v1() };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id, title };
};

export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter };
};
