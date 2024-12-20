import { Project, ProjectUpdate } from "../types/project";
import { Task, TaskUpdate } from "../types/task";

const SERVER_URL = window.location.origin;

export const getTasks = async (): Promise<Task[]> => {
  return fetch(`${SERVER_URL}/api/v1/tasks`).then((res) => res.json());
};

export const getProjects = async (): Promise<Project[]> => {
  return fetch(`${SERVER_URL}/api/v1/project`).then((res) => res.json());
};

export const createTask = async (task: TaskUpdate): Promise<Task> => {
  return fetch(`${SERVER_URL}/api/v1/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const createProject = async (project: ProjectUpdate): Promise<Project> => {
  console.log("p:",project)
  return fetch(`${SERVER_URL}/api/v1/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  }).then((res) => res.json());
};


export const updateTask = async (
  id: string,
  task: TaskUpdate
): Promise<Task> => {
  return fetch(`${SERVER_URL}/api/v1/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const updateProject = async (
  id: string,
  task: ProjectUpdate
): Promise<Project> => {
  return fetch(`${SERVER_URL}/api/v1/project/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const deleteTask = (taskId: string) => {
  return fetch(`${SERVER_URL}/api/v1/tasks/${taskId}`, {
    method: "DELETE",
  });
};

export const deleteProject = (taskId: string) => {
  return fetch(`${SERVER_URL}/api/v1/project/${taskId}`, {
    method: "DELETE",
  });
};
