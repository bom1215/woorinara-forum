import axios from "../axios-config.js"; // Axios 설정 파일

export async function fetchToken() {
  try {
    // const response = await axios.get("/protected/resource");
    const accessToken = localStorage.getItem('accessToken');
    return accessToken
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
