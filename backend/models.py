
import uuid
from pydantic import BaseModel, Field


class Task(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)


class TaskUpdate(BaseModel):
    title: str = Field(...)
    description: str = Field(...)


class Project(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    list_of_tasks: list[Task] = Field(default_factory=list[Task])


class ProjectUpdate(BaseModel):
    title: str = Field(...)
    description: str = Field(...)
    list_of_tasks: list[Task] = Field(default_factory=list[Task])

