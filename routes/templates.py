from os import path
import os
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from bokeh.resources import CDN
import json

router = APIRouter()

js_resources = CDN.render_js()



templates = Jinja2Templates(directory=path.join(
    path.dirname(__file__), "templates"))

@router.get('/', response_class=RedirectResponse)
async def open_page(request: Request):
    return '/map'

@router.get('/map', response_class=HTMLResponse)
def open_page(request: Request):
    return templates.TemplateResponse('main.html', {"request": request})

@router.get("/geojson")
async def get_geojson():
    with open("/home/earlmar/ghrepos/lrrmar/wrf-geojson/multitimemultivar.json", "r") as file:

        data = json.load(file)

    return data

