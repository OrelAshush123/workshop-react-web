# credit: https://github.com/mongodb-developer/pymongo-fastapi-crud

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from task_routes import tasks_router
from project_router import projects_router


# Define startup and shutdown event handlers
async def startup_db_client():
    # because we do not want to hardcode the connection string in the code,
    # we will use an environment variable
    # to run this code, you need to set the MONGO_URI environment variable to your MongoDB connection
    # string. You can do this by running the following command in your terminal:
    # export MONGO_URI="mongodb+srv://<user>:<password>@<some-dns-address>?retryWrites=true&w=majority&appName=<your-app-name>"
    # OR you can create a .env file in the root of your project and add the following line:
    # MONGO_URI="mongodb+srv://<user>:<password>@<some-dns-address>?retryWrites=true&w=majority&appName=<your-app-name>"
    mongo_uri = os.getenv("MONGO_URI")
    assert (
        mongo_uri
    ), "MONGO_URI env var is required, please set it to your MongoDB connection"
    app.mongodb_client = MongoClient(mongo_uri)
    app.database = app.mongodb_client["bootcamp"]


async def shutdown_db_client():
    app.mongodb_client.close()


# Create the FastAPI app with event handlers
app = FastAPI(on_startup=[startup_db_client], on_shutdown=[shutdown_db_client])

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(tasks_router, tags=["tasks"], prefix="/api/v1/tasks")
app.include_router(projects_router, tags=["project"], prefix="/api/v1/project")
