import "./Container.css";
import Column from "./Column";

const Container = (props) => {
  return (
    <div className="container">
      <Column
        label="Backlog"
        tasks={props.tasks.filter((task) => task.label === "Backlog")}
        openModalHandler={props.openModalHandler}
        setDetailTask={props.setDetailTask}
      ></Column>
      <Column
        label="In progress"
        openModalHandler={props.openModalHandler}
        tasks={props.tasks.filter((task) => task.label === "In Progress")}
        setDetailTask={props.setDetailTask}
      ></Column>
      <Column
        label="Completed"
        openModalHandler={props.openModalHandler}
        tasks={props.tasks.filter((task) => task.label === "Completed")}
        setDetailTask={props.setDetailTask}
      ></Column>
    </div>
  );
};

export default Container;
