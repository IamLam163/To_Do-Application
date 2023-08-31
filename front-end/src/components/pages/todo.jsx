import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import PropTypes from "prop-types";
import "./todo.css";
import RenameTaskButton from "./RenameTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";

function Todo({ tasks }) {
  const [taskList, setTaskList] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(`/todo/usertasks/${user.id}`);
          console.log(response.data);
          setTaskList(response.data.tasks);
          console.log(response.data.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  const handleTaskRename = (taskId, newName) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((task) =>
        task._id === taskId ? { ...task, name: newName } : task,
      ),
    );
  };

  const handleTaskDelete = (deletedTaskId) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task._id !== deletedTaskId),
    );
  };

  const handgleToggleCompletion = async (taskId) => {
    try {
      if (user && user.id) {
        const response = await axios.patch(`/todo/toggletask/${taskId}`);
        const updatedTaskList = taskList.map((task) =>
          task._id === taskId ? response.data.updatedTask : task,
        );
        setTaskList(updatedTaskList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //buttons styling

  //main Container style
  const mainContainerStyle = {
    display: "flex",
  };

  const buttonsContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "12px",
    marginLeft: "auto",
    width: "120px",
  };

  return (
    <div className="main-container" style={mainContainerStyle}>
      <div className="todo-container">
        <div className="header">
          <h1>Your Tasks</h1>
        </div>
        <div className="task-list">
          {taskList.length === 0 ? (
            <h4>No tasks Yet, Create a task!</h4>
          ) : (
            taskList.map((task) => (
              <div key={task._id} className="task">
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handgleToggleCompletion(task._id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.name}
                  </span>
                </div>
                <div
                  className="buttons-container"
                  style={buttonsContainerStyle}
                >
                  <div className="buttons" style={{ display: "flex" }}>
                    <RenameTaskButton
                      taskId={task._id}
                      initialTaskName={task.name}
                      onTaskRename={handleTaskRename}
                    />
                    <span style={{ margin: "0 4px" }}></span>
                    <DeleteTaskButton
                      taskId={task._id}
                      onDelete={handleTaskDelete}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

Todo.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default Todo;
