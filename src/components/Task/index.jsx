import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const Task = (props) => {
  const { taskNameDate, taskNameInput, id } = props.task;
  const { handleRemoveTask } = props;

  const handleCheckBox = () => {
    if (
      new Date(taskNameDate).getDate() === new Date().getDate() &&
      new Date(taskNameDate).getMonth() === new Date().getMonth() &&
      new Date(taskNameDate).getFullYear() === new Date().getFullYear()
    ) {
      return true;
    }
  };
  return (
    <div className="card rounder-5 mb-3">
      <div className={`card-header p-3 ${handleCheckBox() && "bg-success"}`}>
        <div className="d-flex justify-content-between">
          <h3 className="h3">{taskNameDate}</h3>
          <button
            className="border-0"
            style={{ background: "none", fontSize: 20 }}
          >
            <CloseOutlined onClick={() => handleRemoveTask(id)} />
          </button>
        </div>
        <p className="h4 text-warning">{taskNameInput}</p>
      </div>
    </div>
  );
};

export default Task;
