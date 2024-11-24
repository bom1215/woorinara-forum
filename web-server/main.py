from fastapi import FastAPI, Header, HTTPException, Response, Request
from starlette.middleware.cors import CORSMiddleware

from starlette.responses import FileResponse, RedirectResponse
from starlette.staticfiles import StaticFiles
import uvicorn
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s - %(message)s",
    datefmt="%m/%d/%Y %I:%M:%S %p",
    handlers=[
        logging.FileHandler("server.log", encoding="utf-8"),
        # logging.StreamHandler(),  # 콘솔 출력
    ],
)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = ["http://43.201.31.70:8000", "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/assets", StaticFiles(directory="../vue-project/dist/assets"))


# Access Token 및 Refresh Token 검증
@app.get("/auth")
def handle_tokens(
    request: Request,
    response: Response = None,
):
    # 헤더에서 Authorization 값을 가져옴
    access_token = request.headers.get("authorization")
    refresh_token = request.headers.get("Refresh-Token")

    logging.info(f"Access Token: {access_token}")
    logging.info(f"refreshToken: {refresh_token}")

    # access_token 있는지 확인
    if not access_token:
        raise HTTPException(status_code=400, detail="Missing Access_token")
    # Refresh-Token 유효성 확인
    if not refresh_token:
        raise HTTPException(status_code=400, detail="Missing Refresh-Token headers")

    response = RedirectResponse(url="/")

    # 쿠키에 토큰 추가
    response.set_cookie(
        key="accessToken", value=access_token, httponly=False, secure=False
    )
    response.set_cookie(
        key="refreshToken", value=refresh_token, httponly=False, secure=False
    )
    logging.info("Cookies added")

    return response


@app.get("/")
async def home_page():
    return FileResponse("../vue-project/dist/index.html")


@app.post("/logging")
async def receive_log(request: Request):
    logs = await request.json()
    client_host = request.client.host  # 클라이언트 IP
    logger.info(f"Client IP ({client_host}) {logs}")
    return {"status": "success"}


if __name__ == "__main__":
    # APPLICATION_PORT = 8000
    # uvicorn.run("main:app", host="43.201.31.70", port=APPLICATION_PORT, reload=True)

    APPLICATION_PORT = 5173
    uvicorn.run("main:app", port=APPLICATION_PORT, reload=True)
