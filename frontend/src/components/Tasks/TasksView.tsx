import React from "react";
import { DataContext } from "../../App";
import { Button } from "../../elements/button/Button";
import { TaskCard } from "./TaskCard";


export const TasksView = () => {
  const { tasks } = React.useContext(DataContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>My Tasks</h1>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      <Button
        variant="primary-button"
        onClick={() => {
          document.location.href = "/task-form";
        }}
      >
        Add Task
      </Button>
      <Button
        variant="primary-button"
        onClick={() => {
          document.location.href = "/project-form";
        }}
      >
        Add Project
      </Button>


    </div>
  );
};
