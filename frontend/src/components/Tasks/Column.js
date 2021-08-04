import "./Column.css";
import Card from "./Card";

const Column = (props) => {
  return (
    <div className="column">
      <div className="label">{props.label}</div>
      {props.tasks.map((task) => (
        <Card
          key={task.id}
          task={task}
          openModalHandler={props.openModalHandler}
          setDetailTask={props.setDetailTask}
        ></Card>
      ))}
    </div>
  );
};

export default Column;
