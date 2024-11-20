import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../App";
import { createProject, updateProject } from "../lib/apiClient";
import { ProjectUpdate } from "../types/project";
import { Button } from "../elements/button/Button";

export const ProjectForm = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = React.useState<ProjectUpdate>({});
  const { tasks } = React.useContext(DataContext);
  const isEdit = !!id;

  useEffect(() => {
    if (!!id) {
      console.log("Edit Project", id);
      const task = tasks.find((task) => task._id === id);
      if (task) {
        setFormValues(task);
      }
    }
  }, [id, tasks]);

  const handleCreateProject = () => {
    console.log("Create Project", formValues);
    createProject(formValues)
      .then((task) => {
        console.log(task);
      })
      .then(() => {
        document.location.href = "/";
      });
  };

  const handleEditProject = () => {
    console.log("Update Project", formValues);
    if (!id) {
      console.error("No id found");
      return;
    }
    updateProject(id, formValues)
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
      <h1>{isEdit ? "Edit Project" : "Create Project"}</h1>
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
            onClick={isEdit ? handleEditProject : handleCreateProject}
          >
            {isEdit ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </div>
    </div>
  );
};
