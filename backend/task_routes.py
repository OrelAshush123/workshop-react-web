from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import Task, TaskUpdate


tasks_router = APIRouter()


@tasks_router.post(
    "",
    response_description="Create a new task",
    status_code=status.HTTP_201_CREATED,
    response_model=Task,
)
def create_task(request: Request, task: Task = Body(...)):
    task = jsonable_encoder(task)
    request.app.database["tasks"].insert_one(task)
    return task


@tasks_router.get("", response_description="List all tasks", response_model=List[Task])
def list_tasks(request: Request):
    tasks = list(request.app.database["tasks"].find(limit=100))
    return tasks


@tasks_router.get(
    "/{id}", response_description="Get a single task by id", response_model=Task
)
def find_task(id: str, request: Request):
    if (task := request.app.database["tasks"].find_one({"_id": id})) is not None:
        return task

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with ID {id} not found"
    )


@tasks_router.put("/{id}", response_description="Update a task", response_model=Task)
def update_task(id: str, request: Request, task: TaskUpdate = Body(...)):
    # Convert Object to dict and remove null values
    task_dict: dict = {k: v for k, v in task.dict().items() if v is not None}

    if len(task_dict) >= 1:
        update_result = request.app.database["tasks"].update_one(
            {"_id": id}, {"$set": task_dict}
        )

        if update_result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with ID {id} not found",
            )

    if (
        existing_task := request.app.database["tasks"].find_one({"_id": id})
    ) is not None:
        return existing_task

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with ID {id} not found"
    )


@tasks_router.delete("/{id}", response_description="Delete a task")
def delete_task(id: str, request: Request, response: Response):
    delete_result = request.app.database["tasks"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with ID {id} not found"
    )
