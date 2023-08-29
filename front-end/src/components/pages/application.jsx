import React, { useContext, useState } from "react";
import Todo from "./todo";
import AddtaskButton from "./AddTodoButton";
import Logout from "./Logout";
import WelcomeUser from "./welcome";

function Application() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <WelcomeUser />
      <Logout />
      <AddtaskButton onAddTask={addTask} />
      <Todo tasks={tasks} />
    </div>
  );
}
export default Application;
