import "./Column.css";
import Card from "./Card";

const Column = (props) => {
  return (
    <div className="column">
      <div className="label">{props.label}</div>
      <div className="column_cards">
        {props.tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            openModalHandler={props.openModalHandler}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Column;
