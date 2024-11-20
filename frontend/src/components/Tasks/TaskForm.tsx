import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { createTask, updateTask } from "../../lib/apiClient";
import { TaskUpdate } from "../../types/task";
import { Button } from "../../elements/button/Button";

export const TaskForm = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = React.useState<TaskUpdate>({});
  const { tasks } = React.useContext(DataContext);
  const isEdit = !!id;

  useEffect(() => {
    if (!!id) {
      console.log("Edit task", id);
      const task = tasks.find((task) => task._id === id);
      if (task) {
        setFormValues(task);
      }
    }
  }, [id, tasks]);

  const handleCreateTask = () => {
    console.log("Create task", formValues);
    createTask(formValues)
      .then((task) => {
        console.log(task);
      })
      .then(() => {
        document.location.href = "/";
      });
  };

  const handleEditTask = () => {
    console.log("Update task", formValues);
    if (!id) {
      console.error("No id found");
      return;
    }
    updateTask(id, formValues)
      .then((task) => {
        console.log(task);
      })
      .then(() => {
        document.location.href = "/";
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "20px",
      }}
    >
      <h1>{isEdit ? "Edit Task" : "Create Task"}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <label
            style={{
              width: "100px",
            }}
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues?.title || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <label
            style={{
              width: "100px",
            }}
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formValues?.description || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          />
        </div>
        <div>
          <Button
            variant="primary-button"
            disabled={!formValues?.title || !formValues?.description}
            onClick={isEdit ? handleEditTask : handleCreateTask}
          >
            {isEdit ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </div>
    </div>
  );
};
