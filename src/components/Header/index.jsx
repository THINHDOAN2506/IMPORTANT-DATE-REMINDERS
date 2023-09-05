import React from "react";

const Header = (props) => {
  const { tasks } = props;

  const arr = [];

  const handleRemindNotes = (tasks) => {
    tasks.forEach((item) => {
      if (
        new Date(item.taskNameDate).getDate() === new Date().getDate() &&
        new Date(item.taskNameDate).getMonth() === new Date().getMonth() &&
        new Date(item.taskNameDate).getFullYear() === new Date().getFullYear()
      ) {
        arr.push(
          <h2 className="card-header mb-1 p-3 rounded-3 bg-light text-danger">
            (^ _ ^)___ {item.taskNameInput} ___(^ _ ^)
          </h2>
        );
      }
    });
    return arr.map((item) => item);
  };
  return (
    <div>
      <div>
        <h3 className="h3 text-center"> {handleRemindNotes(tasks)}</h3>
      </div>
      <br />
      <br />
      <h1 className="h1 text-center pb-5">NHẮC NHỞ NGÀY QUAN TRỌNG CỦA BẠN</h1>
    </div>
  );
};

export default Header;
