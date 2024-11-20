import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TaskForm from "./screens/TaskForm";
// import Login from "./components/Login";
import { Task } from "./types/task";
import { Project } from "./types/project";
import { getTasks } from "./lib/apiClient";
import { getProjects } from "./lib/apiClient";
import { TasksView } from "./components/Tasks/TasksView";
import { ProjectsView } from "./components/Projects/ProjectsView";
import { TaskForm } from "./components/Tasks/TaskForm";
import { ProjectForm } from "./components/Projects/ProjectForm";
import { AllView } from "./components/AllView";

type ServerContextType = {
  tasks: Task[];
  projects: Project[];
};

export const DataContext = React.createContext<ServerContextType>({
  tasks: [],
  projects: [],
});

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);


  useEffect(() => {
    getTasks().then((tasksFromServer: Task[]) => {
      console.log(tasksFromServer);
      setTasks(tasksFromServer);
    }  
  );
  }, []);

  useEffect(() => {
    getProjects().then((tasksFromServer: Project[]) => {
      console.log(tasksFromServer);
      setProjects(tasksFromServer);
    }
  );
  }, []);

  return (
    <DataContext.Provider
      value={{
        tasks: tasks,
        projects: projects,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllView />} />
          <Route path="/tasks" element={<TasksView />} />
          <Route path="/ProjectView" element={<ProjectsView />} />
          <Route path="/task-form/:id?" element={<TaskForm />} />
          <Route path="/project-form/:id?" element={<ProjectForm />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
