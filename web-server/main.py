from fastapi import FastAPI, Header, HTTPException, Response, Request
from starlette.middleware.cors import CORSMiddleware

from starlette.responses import FileResponse, RedirectResponse
from starlette.staticfiles import StaticFiles
import uvicorn
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")

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


# Access Token 및 Refresh Token 검증
@app.get("/auth")
def handle_tokens(
    # access_token: str = Header(default=None),  # Authorization 헤더에서 Access Token
    # refresh_token: str = Header(default=None),  # Refresh-Token 헤더에서 Refresh Token
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
    data = await request.json()
    logs = data

    client_host = request.client.host  # 클라이언트 IP
    user_agent = request.headers.get("User-Agent")  # 사용자 에이전트

    logging.info(f"[Client ({client_host}, {user_agent}] {logs}")

    file_handler = logging.FileHandler("client_logs.log", encoding="utf-8")
    formatter = logging.Formatter("%(asctime)s - %(message)s")
    file_handler.setFormatter(formatter)
    logging.getLogger().addHandler(file_handler)
    return {"status": "success"}


APPLICATION_PORT = 8000
if __name__ == "__main__":
    # uvicorn.run("main:app", host="43.201.31.70", port=APPLICATION_PORT, reload=True)
    uvicorn.run("main:app", port=APPLICATION_PORT, reload=True)
