import React from "react";
import { deleteProject } from "../../lib/apiClient";
import { Project } from "../../types/project";
import { Button } from "../../elements/button/Button";

type Props = {
  project: Project;
};

export const ProjectCard = (props: Props) => {
  const { project } = props;

  const handleDeleteproject = (id: string) => {
    console.log("Delete project", id);
    deleteProject(id).then(() => {
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
          {project.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <strong>Description</strong>
          {project.description}
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
            document.location.href = `/project-form/${project._id}`;
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger-button"
          onClick={() => handleDeleteproject(project._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
