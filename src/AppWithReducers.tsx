import { useReducer } from "react";
import "./App.css";
import { ToDolist } from "./todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./addItemForm";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type AllTaskType = {
  [x: string]: TaskType[];
};

export type FilterValuesType = "all" | "completed" | "active";

export function AppWithReducers() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
  });

  function changeFilter(filter: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatchTodolistsReducer(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(todolistId, title);
    dispatchTasksReducer(action);
  }

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(todolistId, id);
    dispatchTasksReducer(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(todolistId, taskId, isDone);
    dispatchTasksReducer(action);
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatchTodolistsReducer(action);
    dispatchTasksReducer(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatchTodolistsReducer(action);
    dispatchTasksReducer(action);
  }

  function changeTaskTitle(title: string, taskId: string, todolistId: string) {
    const action = changeTaskTitleAC(title, todolistId, taskId);
    dispatchTasksReducer(action);
  }

  function changeTitleTodolist(title: string, id: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchTodolistsReducer(action);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={5}>
          {todolists.map((todolist) => {
            let taskForToDoList = tasks[todolist.id];

            if (todolist.filter === "completed") {
              taskForToDoList = taskForToDoList.filter(
                (task) => task.isDone === true
              );
            }
            if (todolist.filter === "active") {
              taskForToDoList = taskForToDoList.filter(
                (task) => task.isDone === false
              );
            }
            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <ToDolist
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    tasks={taskForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={todolist.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTitleTodolist={changeTitleTodolist}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
