import { useEffect, useState } from "react";
import FormInputTasks from "./components/FormInputTasks";
import Task from "./components/Task";
import Header from "./components/Header";
import { Pagination } from "antd";
import dayjs from "dayjs";

const KEY_REMIND_TASK = "tasks";
function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(KEY_REMIND_TASK)) || []
  );

  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataPerPage: [],
    limitPerPage: 3,
  });
  const renderTasksList = (tasks) => {
    return tasks.map((task) => (
      <Task key={task.id} task={task} handleRemoveTask={handleRemoveTask} />
    ));
  };

  const handleAddTask = (taskNameDate, taskNameInput) => {
    if (taskNameDate === "" || taskNameInput === "") return;
    if (
      new Date(`${dayjs(new Date()).format("YYYY-MM-DD")} 12:00:00`).getTime() >
      new Date(`${taskNameDate} 12:00:00`).getTime()
    )
      return;
    const _taskList = {
      id: Math.random(),
      taskNameDate: `Ngày: ${taskNameDate}`,
      taskNameInput: taskNameInput,
    };
    setTasks([_taskList, ...tasks]);
    localStorage.setItem(
      KEY_REMIND_TASK,
      JSON.stringify([_taskList, ...tasks])
    );
  };

  const handleRemindNote = (tasks) => {
    tasks.forEach((item) => {
      if (
        new Date(item.taskNameDate).getDate() === new Date().getDate() &&
        new Date(item.taskNameDate).getMonth() === new Date().getMonth() &&
        new Date(item.taskNameDate).getFullYear() === new Date().getFullYear()
      ) {
        return true;
      }
    });
  };

  const handleRemoveTask = (taskId) => {
    const _task = tasks.filter((task) => task.id !== taskId);
    setTasks(_task);
    localStorage.setItem(KEY_REMIND_TASK, JSON.stringify(_task));
  };

  const handleChangePage = (page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  useEffect(() => {
    if (!tasks.length) {
      setPagination({
        ...pagination,
        dataPerPage: [],
      });
      return;
    }
    const _taskList = [...tasks];
    const startIndex = (pagination.currentPage - 1) * pagination.limitPerPage;
    const endIndex = pagination.currentPage * pagination.limitPerPage;
    const tasksPerPage = _taskList.slice(startIndex, endIndex);
    setPagination({
      ...pagination,
      dataPerPage: [...tasksPerPage],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, pagination.currentPage]);

  return (
    <div className="App">
      <div className="container">
        <div
          className="card border-primary p-5 mt-5"
          style={{
            background: "rgb(175, 230, 12)",
            borderRadius: 20,
            borderWidth: 10,
          }}
        >
          <Header
            key={tasks.id}
            tasks={tasks}
            handleRemindNote={handleRemindNote}
          />
          <div className="row">
            <div className="col-md-6 p-3">
              <FormInputTasks handleAddTask={handleAddTask} />
            </div>
            <div
              className="col-md-6 p-3 border border-5 border-primary "
              style={{
                borderRadius: 20,
              }}
            >
              <div className="card-body">
                {renderTasksList(pagination.dataPerPage)}
              </div>
              <div className="card-footer text-center">
                <Pagination
                  defaultCurrent={pagination.currentPage}
                  current={pagination.currentPage}
                  onChange={(page) => {
                    handleChangePage(page);
                  }}
                  total={tasks.length || 0}
                  pageSize={pagination.limitPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
