# credit: https://github.com/mongodb-developer/pymongo-fastapi-crud

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from task_routes import tasks_router


# Define startup and shutdown event handlers
async def startup_db_client():
    app.mongodb_client = MongoClient(
        "mongodb+srv://<user>:<password>@cluster0.04aztqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
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