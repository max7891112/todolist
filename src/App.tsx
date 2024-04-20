import { useState } from "react";
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

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<AllTaskType>({
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

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function addTask(title: string, todolistId: string) {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [...tasks[todolistId], newTask];
    tasks[todolistId] = newTasks;
    setTasks({ ...tasks });
  }

  function removeTask(id: string, todolistId: string) {
    let resultTasks = tasks[todolistId].filter((task) => task.id !== id);
    tasks[todolistId] = resultTasks;
    setTasks({ ...tasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let changeTask = tasks[todolistId].find((task) => task.id === taskId);
    if (changeTask) {
      changeTask.isDone = isDone;
      setTasks({ ...tasks });
    } // ???
  }

  function removeTodolist(todolistId: string) {
    const filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasks[todolistId];
    setTasks({ ...tasks });
  }

  function addTodoList(title: string) {
    const todolist: TodolistType = { id: v1(), title: title, filter: "all" };
    setTodolists([...todolists, todolist]);
    setTasks({ ...tasks, [todolist.id]: [] });
  }

  function changeTaskTitle(
    newValue: string,
    taskId: string,
    todolistId: string
  ) {
    let task = tasks[todolistId].find((task) => task.id === taskId);
    if (task) {
      task.title = newValue;
      setTasks({ ...tasks });
    }
  }

  function changeTitleTodolist(title: string, id: string) {
    let todolist = todolists.find((todolist) => todolist.id === id);
    if (todolist) {
      todolist.title = title;
      setTodolists([...todolists]);
    }
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

export default App;
