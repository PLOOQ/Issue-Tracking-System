import "./App.css";
import axios from 'axios';
import Container from "./components/Tasks/Container";
import { useEffect, useState } from "react";
import Header from "./components/Tasks/Header";
import TaskDetailModal from "./components/Tasks/TaskDetailModal";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


function App() {
  const database_path = "http://127.0.0.1:8000/tasks";
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailTask, setDetailTask] = useState({
    id: "",
    name: "",
    label: "",
    body: "",
  });

  useEffect(() => {
    fetch(database_path)
      .then((resp) => resp.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const openModalHandler = (task) => {
    if (!task) {
      setDetailTask((prevState) => {
        return { ...prevState, label: "Backlog" };
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
  return (
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
export default App;
