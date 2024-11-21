import { validatePostDetail } from "../utils/validation/validReadPostDetail.js";
import { validateSearchPost } from "../utils/validation/validSearchPost.js";
import { fetchToken } from "./getToken.js";
import { addLogging } from "@/utils/logging/log.js";

export async function createPost(title, content, forumCategory, header) {
  const url = import.meta.env.VITE_POSTCREATE;
  addLogging("creatPost Start");

  // QnA가 아닌 경우 header를 null로 설정
  if (forumCategory !== "QnA") {
    header = null;
  }

  // 요청 바디 생성
  const requestBody = {
    title: title,
    content: content,
    header: header,
    forumCategory: forumCategory,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await fetchToken()}`,
      },
      body: JSON.stringify(requestBody),
    });
    // 응답 처리
    const result = await response.json();

    if (response.ok) {
      addLogging("Response from createPost API:", result);
      return result.data;
    } else {
      addLogging("Error occurred in createPost:", result);
    }
  } catch (error) {
    // 네트워크 에러 또는 fetch 실패 처리
    addLogging("Error occurred in createPost:", error);
  }
}

export async function readPostDetail(forumId) {
  const url = import.meta.env.VITE_POSTGENERAL + `/${forumId}`;
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
      return null; // 에러 발생 시 null 반환
    }
  } catch (error) {
    addLogging("Error occurred in readPostDetail:", error);
    return null; // 네트워크 에러 발생 시 null 반환
  }
}

export async function readPostList(page, size) {
  const url =
    import.meta.env.VITE_POSTGENERAL + `/list?page=${page}&size=${size}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await fetchToken()}`,
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      validateSearchPost(result);
      return result.data; // 함수의 끝에서 result.data 반환
    } else {
      addLogging("Error occurred in readPostList:", result);
      return null; // 에러 발생 시 null 반환
    }
  } catch (error) {
    addLogging("Error occurred in readPostList:", error);
    return null; // 네트워크 에러 발생 시 null 반환
  }
}

export async function searchPost(word, page, size) {
  const url =
    import.meta.env.VITE_POSTGENERAL +
    `/list?word=${word}&page=${page}&size=${size}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await fetchToken()}`,
      },
    });

    // 응답 데이터를 JSON으로 변환
    const result = await response.json();

    // HTTP 상태 코드와 서버 반환 상태 확인
    if (response.ok) {
      validateSearchPost(result); // 데이터 검증 함수 호출
      return result.data; // 검색 결과 반환
    } else {
      addLogging("Error occurred in searchPost:", result);
      return null; // 에러 시 null 반환
    }
  } catch (error) {
    addLogging("Error occurred in searchPost:", error);
    return null; // 네트워크 에러 시 null 반환
  }
}

export async function updatePost(forumId, title, content, header) {
  const url = import.meta.env.VITE_POSTUPDATE;
  const requestBody = {
    forumId: forumId,
    title: title,
    content: content,
    header: header,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await fetchToken()}`,
      },
      body: JSON.stringify(requestBody),
    });

    // 응답 상태 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 200) {
      return result.data;
    } else {
      addLogging("Error occurred in updatePost:", result);
    }
  } catch (error) {
    addLogging("Error occurred in updatePost:", error);
  }
}

export async function deletePost(forumId) {
  const url = import.meta.env.VITE_POSTDELETE;
  const requsetBody = {
    forumId: forumId,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await fetchToken()}`,
    },
    body: JSON.stringify(requsetBody),
  })
    .then((response) => {
      return response.json(); // 응답 Body를 한 번만 읽을 수 있음.
    })
    .then((result) => {
      if (result.status == 200) {
      } else {
        addLogging("Error occured in deletePost:", result);
      }
    })
    .catch((error) => {
      addLogging("Error occured in deletePost:", error);
    });
}

export async function sendLikes(forumId) {
  const url = import.meta.env.VITE_POSTLIKES;
  const requestBody = {
    forumId: forumId,
  };

  try {
    const token = await fetchToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (result.status === 200) {
      if (Number.isInteger(result.data)) {
        return result.data;
      } else {
        addLogging("Likes are not integer. Likes: ", result.data);
      }
    } else {
      addLogging("Error occurred in readLikes:", result);
    }
  } catch (error) {
    addLogging("Error occurred in readLikes:", error);
  }
}


// createPost("test_title", "test_content", "QnA", "Visa");
// readPostDetail(20);
// readPostList(0,)
// searchPost("내용", 0, 20)

// updatePost(29, "edited_title", "edited_content", "Visa")
// deletePost(29)
// readLikes(1)
