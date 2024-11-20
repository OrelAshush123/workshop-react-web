import React from "react";
import { deleteTask } from "../../lib/apiClient";
import { Task } from "../../types/task";
import { Button } from "../../elements/button/Button";

type Props = {
  task: Task;
};

export const TaskCard = (props: Props) => {
  const { task } = props;

  const handleDeleteTask = (id: string) => {
    console.log("Delete task", id);
    deleteTask(id).then(() => {
      document.location.href = "/";
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <strong>Title</strong>
          {task.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <strong>Description</strong>
          {task.description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="secondary-button"
          onClick={() => {
            document.location.href = `/task-form/${task._id}`;
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger-button"
          onClick={() => handleDeleteTask(task._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
