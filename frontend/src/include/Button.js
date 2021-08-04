import "./Button.css";

const Button = (props) => {
  return (
    <button className="button" onClick={props.task}>
      {props.label}
    </button>
  );
};

export default Button;
