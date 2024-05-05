import "./App.css";
import { ToDolist } from "./todolist";
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
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

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

export function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists
  );

  const tasks = useSelector<AppRootStateType, AllTaskType>(
    (state) => state.tasks
  );

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(todolistId, title);
    dispatch(action);
  }

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(todolistId, id);
    dispatch(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(todolistId, taskId, isDone);
    dispatch(action);
  }

  function changeTaskTitle(title: string, taskId: string, todolistId: string) {
    const action = changeTaskTitleAC(title, todolistId, taskId);
    dispatch(action);
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
  }

  function changeFilter(filter: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  }

  function changeTitleTodolist(title: string, id: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
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
