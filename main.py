from os import path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes import templates

app = FastAPI()



app.mount("/static", StaticFiles(directory=path.join(path.dirname(__file__),
          "static")), name="static")

app.include_router(templates.router)
