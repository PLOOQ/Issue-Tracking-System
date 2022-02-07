import "./App.css";
import axios from 'axios';
import Container from "./components/Tasks/Container";
import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Header from "./components/Tasks/Header";
import TaskDetailModal from "./components/Tasks/TaskDetailModal";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


function App() {
  const database_path = "http://127.0.0.1:8000/tasks";
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState('');
  const [isToken, setIsToken] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailTask, setDetailTask] = useState({
    id: "",
    name: "",
    label: "",
    body: "",
  });

  const fetchData = () =>
  {
    fetch(database_path,{
      headers: { "Authorization": `Token ${token}`},
    })
      .then((resp) => resp.json())
      .then((data) => {
        if(Array.isArray(data))
        {
          setTasks(data);
        }
      });
  }
  useEffect(() => {
    console.log(token);
    fetchData();
  }, [token,isToken]);

  const openModalHandler = (task) => {
    if (!task) {
      setDetailTask((prevState) => {
        return { ...prevState,label: "Backlog"};
      });
    } else {
      setDetailTask((prevState) => {
        return {
          ...prevState,
          id: task.id,
          name: task.name,
          label: task.label,
          body: task.body,
        };
      });
    }
    setModalIsOpen(true);
  };

  const loginHandler = (token) =>{
    setToken(token);
    setIsToken(true);
  }

  if (!isToken)
  {
    return (
      <div>
        <Login 
        loginHandler={loginHandler}
        />
      </div>
    )
  }
  else if (isToken)
  {
    return token && (
      <div className="App">
        <Header openModalHandler={openModalHandler} />
        <Container tasks={tasks} openModalHandler={openModalHandler} />
        <TaskDetailModal
          tasks={tasks}
          setTasks={setTasks}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          detailTask={detailTask}
          setDetailTask={setDetailTask}
        />
      </div>
    );
  }
}
export default App;
