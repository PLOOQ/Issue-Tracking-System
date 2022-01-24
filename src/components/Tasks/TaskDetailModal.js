import Modal from "react-modal";
import "./TaskDetailModal.css";

const TaskDetailModal = (props) => {
  const onChangeNameHandler = (event) => {
    props.setDetailTask((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };
  const onChangeLabelHandler = (event) => {
    props.setDetailTask((prevState) => {
      return { ...prevState, label: event.target.value };
    });
  };
  const onChangeBodyHandler = (event) => {
    props.setDetailTask((prevState) => {
      return { ...prevState, body: event.target.value };
    });
  };
  const submitUpdateTaskDetailHandler = () => {
    const data = JSON.stringify({
      id: props.detailTask.id,
      name: props.detailTask.name,
      label: props.detailTask.label,
      body: props.detailTask.body,
    });
    props.setModalIsOpen(false);
    if (!props.detailTask.id) {
      fetch("https://mighty-issue-tracking-system.herokuapp.com/tasks", {
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }).then((resp) => {
        resp.json().then((data) => {
          const newTasks = props.tasks.filter(
            (task) => task.id !== props.detailTask.id
          );
          props.setTasks([...newTasks, data]);
          props.setModalIsOpen(false);
        });
      });
    } else {
      fetch(`https://mighty-issue-tracking-system.herokuapp.com/tasks${props.detailTask.id}`, {
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/json" },
      }).then((resp) => {
        resp.json().then((data) => {
          const newTasks = props.tasks.filter(
            (task) => task.id !== props.detailTask.id
          );
          props.setTasks([...newTasks, data]);
          props.setModalIsOpen(false);
        });
      });
    }
    props.setDetailTask({
      id: "",
      name: "",
      label: "",
      body: "",
    });
  };
  const deleteTaskDetailHandler = () => {
    fetch(`https://mighty-issue-tracking-system.herokuapp.com/tasks/${props.detailTask.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      const newTasks = props.tasks.filter(
        (task) => task.id !== props.detailTask.id
      );
      props.setTasks([...newTasks]);
      props.setModalIsOpen(false);
    });
    props.setDetailTask({
      id: "",
      name: "",
      label: "",
      body: "",
    });
  };
  const customStyles = {
    content: {
      top: "49%",
      left: "49.8%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },

    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.281)",
    },
  };
  return (
    <Modal isOpen={props.modalIsOpen} style={customStyles} ariaHideApp={false}>
      <div>
        <div className="modal_elements">
          <input
            defaultValue={props.detailTask.name}
            className="detailName"
            onChange={onChangeNameHandler}
          ></input>
          <textarea
            defaultValue={props.detailTask.body}
            className="modal_body"
            onChange={onChangeBodyHandler}
          ></textarea>
          <select
            defaultValue={props.detailTask.label}
            className="modal_label"
            onChange={onChangeLabelHandler}
          >
            <option value="Backlog">Backlog</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            className="btn_cancel"
            onClick={() => {
              props.setModalIsOpen(false);
              props.setDetailTask({
                id: "",
                name: "",
                label: "",
                body: "",
              });
            }}
          >
            Cancel
          </button>
          <button className="btn_delete" onClick={deleteTaskDetailHandler}>
            Delete
          </button>
          <button className="btn_add" onClick={submitUpdateTaskDetailHandler}>
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
