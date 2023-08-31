import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

function DeleteTaskButton({ taskId, onDelete }) {
  const handleDelete = async () => {
    try {
      if (taskId) {
        await axios.delete(`/todo/deletetask/${taskId}`);
        onDelete(taskId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
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
  );
}

DeleteTaskButton.propTypes = {
  taskId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteTaskButton;
