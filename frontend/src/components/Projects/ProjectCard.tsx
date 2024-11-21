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
        flexDirection: "column",
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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

      {/* Tasks Section */}
      {project.tasks && project.tasks.length > 0 && (
        <div
          style={{
            borderTop: "1px solid #e0e0e0",
            paddingTop: "10px",
          }}
        >
          <strong style={{ marginBottom: "10px", display: "block" }}>
            Tasks ({project.tasks.length})
          </strong>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {project.tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: "4px",
                  padding: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong style={{ marginRight: "8px" }}>Task:</strong>
                    {task.title}
                  </div>
                </div>
                {task.description && (
                  <div
                    style={{
                      marginTop: "4px",
                      color: "#666",
                      fontSize: "0.9em",
                    }}
                  >
                    <strong style={{ marginRight: "8px" }}>Description:</strong>
                    {task.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};