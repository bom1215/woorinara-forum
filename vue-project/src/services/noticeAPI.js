import { validateNoticeList } from "../utils/validation/validNoticeList.js";
import { fetchToken } from "./getToken.js";
import { addLogging } from "@/utils/logging/log.js";

export async function readNoticeList() {
  const url = import.meta.env.VITE_NOTICE;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await fetchToken()}`,

      },
    });

    const result = await response.json();

    if (result.status === 200) {
      validateNoticeList(result.data);
      return result.data; // 정상적으로 데이터를 반환
    } else {
      addLogging("Error occurred in readNoticeList:", result);
      return null; // 에러 발생 시 null 반환
    }
  } catch (error) {
    addLogging("Error occurred in readNoticeList:", error);
    return null; // 네트워크 에러 발생 시 null 반환
  }
}


export async function readPostDetailFromNotice(forumId, alarmId) {
  const url = import.meta.env.VITE_POSTGENERAL + `/${forumId}?alarmId=${alarmId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await fetchToken()}`,
      },
    }
  );

    const result = await response.json();

    if (result.status === 200) {
      validatePostDetail(result.data);
      return result.data; // 정상적으로 데이터를 반환
    } else {
      addLogging("Error occurred in readPostDetailFromNotice:", result);
      return null; // 에러 발생 시 null 반환
    }
  } catch (error) {
    addLogging("Error occurred in readPostDetailFromNotice:", error);
    return null; // 네트워크 에러 발생 시 null 반환
  }
}