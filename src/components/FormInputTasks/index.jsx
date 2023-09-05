import { Input } from "antd";
import React, { useState } from "react";

const FormInputTasks = (props) => {
  const [taskNameInput, setTaskNameInput] = useState("");
  const [taskNameDate, setTaskNameDate] = useState("");
  const { handleAddTask } = props;
  const handleChangeTaskInput = (event) => {
    setTaskNameInput(event.target.value);
  };
  const handleChangeTaskDate = (event) => {
    setTaskNameDate(event.target.value);
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();
    handleAddTask(taskNameDate, taskNameInput);
    setTaskNameInput("");
    setTaskNameDate("");
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmitTask}>
        <label className="d-flex">
          <p className="h4 text-nowrap">Nội dung:</p>
          <div>
            <Input
              className="mx-4"
              placeholder="mời nhập nội dung của ngày"
              value={taskNameInput}
              onChange={handleChangeTaskInput}
            />
            {!taskNameInput.length && (
              <div className="text-danger px-4 py-2">
                Bạn chưa nhập NỘI DUNG
              </div>
            )}
          </div>
        </label>

        <label className="d-flex">
          <p className="py-2 h4 text-nowrap">Ngày nhắc:</p>
          <div>
            <div className="d-flex ">
              <div className="p-2">
                <input
                  style={{ cursor: "pointer", borderRadius: 5 }}
                  className="border-1"
                  type="date"
                  onChange={handleChangeTaskDate}
                  value={taskNameDate}
                />
              </div>
              <button
                type="submit"
                className="btn-dark border-1 rounded-3 mt-1"
                style={{ height: 30 }}
              >
                Lưu Ngày
              </button>
            </div>
            {!taskNameDate.length && (
              <div className="text-danger px-2 py-2">
                Bạn chưa chọn NGÀY NHẮC
              </div>
            )}
          </div>
        </label>
      </form>
    </React.Fragment>
  );
};

export default FormInputTasks;
