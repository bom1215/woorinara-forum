// 일반 자바스크립트 파일: axios-config.js

import axios from 'axios';

// Access Token과 Refresh Token 가져오기
const accessToken = localStorage.getItem('accessToken'); // iOS에서 전달된 Access Token
const refreshToken = localStorage.getItem('refreshToken'); // iOS에서 전달된 Refresh Token

// Axios 기본 설정
const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}:8000`,
});

// 요청 인터셉터: Authorization 헤더에 Access Token 추가
instance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: Access Token 만료 시 Refresh Token 사용
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                // Refresh Token으로 새 Access Token 가져오기
                const response = await axios.post(`${import.meta.env.VITE_SERVER}:8000/auth/refresh`, {
                    refreshToken,
                });

                // 새 Access Token 저장
                localStorage.setItem('accessToken', response.data.accessToken);

                // 원래 요청 재전송
                error.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                return axios(error.config);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
