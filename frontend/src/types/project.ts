import {Task, TaskUpdate} from "../types/task"


export type Project = {
    _id: string;
    title: string;
    description: string;
    tasks: Task[]; // An array of Task objects
  };
  
  export type ProjectUpdate = {
    title?: string;
    description?: string;
    tasks?: TaskUpdate[]; // An array of TaskUpdate objects
  };