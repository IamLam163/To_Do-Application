import React, { useState } from "react";
import axios from "axios";

function RenameTaskButton({ taskId, onTaskRename }) {
  const [renameMode, setRenameMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

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
        <button onClick={() => setRenameMode(true)}>Rename</button>
      )}
    </div>
  );
}

export default RenameTaskButton;

/*
import React, { useState } from "react";
import axios from "axios";

function RenameTaskButton({ taskId, onTaskRename }) {
  const [renameMode, setRenameMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

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
        <button onClick={() => setRenameMode(true)}>Rename</button>
      )}
    </div>
  );
}

export default RenameTaskButton;
*/
