import React from "react";
import { DataContext } from "../../App";
import { Button } from "../../elements/button/Button";
import { ProjectCard } from "./ProjectCard";


export const ProjectsView = () => {
  const { projects } = React.useContext(DataContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>My Projects</h1>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
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
