import "./Card.css";

const Card = (props) => {
  return (
    <div
      className="card"
      onClick={() => {
        props.openModalHandler(props.task);
      }}
    >
      {props.task.name}
    </div>
  );
};

export default Card;
