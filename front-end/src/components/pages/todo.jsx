import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import PropTypes from "prop-types";
import "./todo.css";

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

  const handleDeleteTask = async (taskId) => {
    try {
      if (user && user.id) {
        await axios.delete(`/todo/deletetask/${taskId}`);
        // Update the taskList after deletion
        const updatedTaskList = taskList.filter((task) => task._id !== taskId);
        console.log("Task Deleted Successfully");
        setTaskList(updatedTaskList);
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
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
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handgleToggleCompletion(task._id)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.name}
              </span>
              <button
                onClick={() => {
                  const newName = prompt("Enter the new task name:", task.name);
                  if (newName) {
                    handleTaskRename(task._id, newName);
                  }
                }}
                style={{
                  fontSize: "13px",
                  transition: "transform 0.2s ease",
                  marginLeft: "auto",
                  backgroundColor: "green",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Rename
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                style={{
                  fontSize: "13px",
                  transition: "transform 0.2s ease",
                  marginLeft: "auto",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Delete
              </button>
            </div>
          ))
        )}
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
