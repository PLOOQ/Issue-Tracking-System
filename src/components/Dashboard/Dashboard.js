import './Dashboard.css'
import Header from "../../components/Tasks/Header"
import Container from "../../components/Tasks/Container"
import TaskDetailModal from "../../components/Tasks/TaskDetailModal"
import { useEffect, useState } from "react";

function Dashboard (props) {
    const database_path = "http://127.0.0.1:8000/tasks";
    const [tasks, setTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailTask, setDetailTask] = useState({
        id: "",
        name: "",
        label: "",
        body: "",
        });
        
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
        const fetchData = () =>
    {
        fetch(database_path,{
        headers: { "Authorization": `Token ${props.token}`},
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
        fetchData();
    });

  return(
    <div>
        <Header openModalHandler={openModalHandler} />
        <Container tasks={tasks} openModalHandler={openModalHandler}/>
        <TaskDetailModal
          token = {props.token}
          tasks={tasks}
          setTasks={setTasks}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          detailTask={detailTask}
          setDetailTask={setDetailTask}
        />
    </div>
  )
}



export default Dashboard;