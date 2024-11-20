import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { createProject, updateProject } from "../../lib/apiClient";
import { ProjectUpdate } from "../../types/project";
import { TaskUpdate } from "../../types/task"
import { Button } from "../../elements/button/Button";

export const ProjectForm = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState<ProjectUpdate>({
    tasks: []
  });
  const [currentTask, setCurrentTask] = useState<TaskUpdate>({});
  const { projects } = React.useContext(DataContext);
  const isEdit = !!id;

  useEffect(() => {
    if (!!id) {
      console.log("Edit Project", id);
      const project = projects.find((project) => project._id === id);
      if (project) {
        setFormValues({
          title: project.title,
          description: project.description,
          tasks: project.tasks || []
        });
      }
    }
  }, [id, projects]);

  const handleCreateProject = () => {
    console.log("Create Project", formValues);
    createProject(formValues)
      .then((project) => {
        console.log(project);
      })
      .then(() => {
        //document.location.href = "/";
      });
  };

  const handleEditProject = () => {
    console.log("Update Project", formValues);
    if (!id) {
      console.error("No id found");
      return;
    }
    updateProject(id, formValues)
      .then((project) => {
        console.log(project);
      })
      .then(() => {
        document.location.href = "/";
      });
  };

  const addTaskToProject = () => {
    // Check if task has both title and description
    if (currentTask.title && currentTask.description) {
      // Update formValues to include the new task
      setFormValues(prev => ({
        ...prev,
        tasks: [...(prev.tasks || []), currentTask]
      }));

      // Reset current task input
      setCurrentTask({});
    }
  };

  const removeTask = (indexToRemove: number) => {
    setFormValues(prev => ({
      ...prev,
      tasks: prev.tasks?.filter((_, index) => index !== indexToRemove)
    }));
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

        {/* Tasks Section */}
        <div style={{ marginTop: "20px" }}>
          <h3>Tasks</h3>
          {formValues.tasks && formValues.tasks.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              {formValues.tasks.map((task, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: "flex", 
                    gap: "8px", 
                    marginBottom: "8px", 
                    alignItems: "center" 
                  }}
                >
                  <span>{task.title} - {task.description}</span>
                  <Button 
                    variant="secondary-button" 
                    onClick={() => removeTask(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add Task Form */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input 
              type="text"
              placeholder="Task Title"
              value={currentTask.title || ""}
              onChange={(e) => 
                setCurrentTask((prev: any) => ({ ...prev, title: e.target.value }))
              }
            />
            <input 
              type="text"
              placeholder="Task Description"
              value={currentTask.description || ""}
              onChange={(e) => 
                setCurrentTask((prev: any) => ({ ...prev, description: e.target.value }))
              }
            />
            <Button
              variant="primary-button"
              disabled={!currentTask.title || !currentTask.description}
              onClick={addTaskToProject}
            >
              Add Task
            </Button>
          </div>
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