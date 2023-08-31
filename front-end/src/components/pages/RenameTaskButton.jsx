import React, { useState } from "react";
import axios from "axios";

function RenameTaskButton({ taskId, initialTaskName, onTaskRename }) {
  const [renameMode, setRenameMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState(initialTaskName);

  const handleRename = async () => {
    try {
      const response = await axios.patch(`/todo/rename/${taskId}`, {
        newName: newTaskName,
      });
      const updatedTask = response.data.updatedTask;
      onTaskRename(updatedTask._id, updatedTask.name);
      setRenameMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renameButtonStyle = {
    fontSize: "13px",
    transition: "transform 0.2s ease",
    marginLeft: "auto",
    backgroundColor: "green",
  };

  const renameButtonHoverStyle = {
    transform: "scale(1.2)",
  };

  return (
    <div>
      {renameMode ? (
        <div>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <button onClick={handleRename}>Save</button>
        </div>
      ) : (
        <button
          onClick={() => setRenameMode(true)}
          style={renameButtonStyle}
          onMouseOver={(e) =>
            Object.assign(e.target.style, renameButtonHoverStyle)
          }
          onMouseOut={(e) =>
            Object.assign(e.target.style, { transform: "scale(1)" })
          }
        >
          Rename
        </button>
      )}
    </div>
  );
}

export default RenameTaskButton;
