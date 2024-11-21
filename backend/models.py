import uuid
from typing import Optional
from pydantic import BaseModel, Field


class Task(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class Project(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    tasks: list[Task] = Field(default_factory=list)


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tasks: Optional[list[Task]] = Field(default_factory=list)