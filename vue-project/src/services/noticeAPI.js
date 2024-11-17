import { validateNoticeList } from "../utils/validation/validNoticeList.js";

export async function readNoticeList() {
  const url = import.meta.env.VITE_NOTICE;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      console.log("Response from readNoticeList:", result);
      validateNoticeList(result.data);
      return result.data; // 정상적으로 데이터를 반환
    } else {
      console.error("Error occurred in readNoticeList:", result);
      return null; // 에러 발생 시 null 반환
    }
  } catch (error) {
    console.error("Error occurred in readNoticeList:", error);
    return null; // 네트워크 에러 발생 시 null 반환
  }
}
