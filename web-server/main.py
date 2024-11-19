from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles
import uvicorn

app = FastAPI()

origins = [
    "http://43.201.31.70:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/assets", StaticFiles(directory="../vue-project/dist/assets"))


@app.get("/")
def index():
    return FileResponse("../vue-project/dist/index.html")


APPLICATION_PORT = 8000
if __name__ == "__main__":
    uvicorn.run("main:app", host="43.201.31.70", port=APPLICATION_PORT, reload=True)
