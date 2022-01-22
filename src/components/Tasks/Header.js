import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <h1> Issue Tracker </h1>
      <h2>Project Name</h2>
      <button
        className="plus-button plus-button--large"
        onClick={() => props.openModalHandler()}
      >
        +
      </button>
    </div>
  );
};

export default Header;
