from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Task,  Project, ProjectUpdate


projects_router = APIRouter()

@projects_router.post(
    "",
    response_description="Create a new project",
    status_code=status.HTTP_201_CREATED,
    response_model=Task,
)
def create_project(request: Request, project: Project = Body(...)):
    project = jsonable_encoder(project)
    request.app.database["projects"].insert_one(project)
    return project

@projects_router.get("", response_description="List all project", response_model=List[Project])
def list_projects(request: Request):
    tasks = list(request.app.database["projects"].find(limit=300))
    return tasks

@projects_router.get(
    "/{id}", response_description="Get a single project by id", response_model=Project
)
def find_project(id: str, request: Request):
    if (project := request.app.database["projects"].find_one({"_id": id})) is not None:
        return project

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Project with ID {id} not found"
    )


@projects_router.put("/{id}", response_description="Update a project", response_model=Project)
def update_project(id: str, request: Request, task: ProjectUpdate = Body(...)):
    # Convert Object to dict and remove null values
    project_dict: dict = {k: v for k, v in task.dict().items() if v is not None}

    if len(project_dict) >= 1:
        update_result = request.app.database["projects"].update_one(
            {"_id": id}, {"$set": project_dict}
        )

        if update_result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Project with ID {id} not found",
            )

    if (
        existing_project := request.app.database["projects"].find_one({"_id": id})
    ) is not None:
        return existing_project

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Project with ID {id} not found"
    )

@projects_router.delete("/{id}", response_description="Delete a project")
def delete_project(id: str, request: Request, response: Response):
    delete_result = request.app.database["projects"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Project with ID {id} not found"
    )