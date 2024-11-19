import { validateCommentList } from "../utils/validation/validReadCommentList.js";
import { fetchToken } from "./getToken.js";

export async function createParentComment(forumId, content) {
  const url = import.meta.env.VITE_COMMENTCREATE;
  const requestBody = {
    forumId: parseInt(forumId),
    content: content,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
        Authorization: `Bearer ${await fetchToken()}`,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (response.ok && result.status === 200) {
      console.log("Response from createParentComment API:", result);
      return result; // 성공적으로 처리된 데이터를 반환
    } else {
      console.error("Error occurred in createParentComment:", result);
      return null; // 에러 발생 시 null 반환
    }
  } catch (error) {
    console.error("Error occurred in createParentComment:", error);
    return null; // 네트워크 에러 발생 시 null 반환
  }
}

export async function createChildComment(forumId, parentCommentId, content) {
  const url = import.meta.env.VITE_COMMENTCREATE;
  const requestBody = {
    forumId: forumId,
    parentCommentId: parentCommentId,
    content: content,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
        Authorization: `Bearer ${await fetchToken()}`,
      },
      body: JSON.stringify(requestBody),
    });

    // 응답 처리
    const result = await response.json();
    if (response.ok) {
      console.log("Response from createChildComment API:", result);
      return result.data;
    } else {
      console.error("Error occurred in createChildComment:", result);
    }
  } catch (error) {
    console.error("Error occurred in createChildComment:", error);
  }
}

export async function updateComment(commentId, content) {
  const url = import.meta.env.VITE_COMMENTUPDATE;
  const requsetBody = {
    commentId: commentId,
    content: content,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
      Authorization: `Bearer ${await fetchToken()}`,
    },
    body: JSON.stringify(requsetBody),
  })
    .then((response) => {
      return response.json(); // 응답 Body를 한 번만 읽을 수 있음.
    })
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from updateComment API:", result);
      } else {
        console.error("Error occured in updateComment:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in updateComment:", error);
    });
}

export async function deleteComment(commentId) {
  const url = import.meta.env.VITE_COMMENTDELETE + `/${commentId}`;
  const requestBody = {
    commentId: commentId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await fetchToken()}`, // 동적으로 토큰 가져오기
      },
      body: JSON.stringify(requestBody),
    });

    // 응답 처리
    const result = await response.json(); // 응답 Body 읽기

    if (response.ok) {
      console.log("Response from deleteComment API:", result);
      return result; // 성공적인 응답 반환
    } else {
      console.error("Error occurred in deleteComment:", result);
      return null; // 실패한 경우 null 반환
    }
  } catch (error) {
    // 네트워크 오류 또는 기타 예외 처리
    console.error("Error occurred in deleteComment:", error);
    return null; // 오류 발생 시 null 반환
  }
}


// contentList 없을 경우 빈 리스트 반환
export async function readCommentList(forumId) {
  const url = import.meta.env.VITE_COMMENTGENERAL + `/${forumId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
        Authorization: `Bearer ${await fetchToken()}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Response from readCommentList:", result);
      validateCommentList(result.data); // 데이터 유효성 검증
      return result.data; // 댓글 데이터 반환
    } else {
      console.error("Error occurred in readCommentList:", result);
      return []; // 에러 시 빈 배열 반환
    }
  } catch (error) {
    console.error("Error occurred in readCommentList:", error);
    return []; // 네트워크 에러 시 빈 배열 반환
  }
}

// createParentComment(1, "test_parent_comment"); //부모 댓글
// createParentComment(1, 1,"test_child_comment"); // 자식 댓글

// updateComment(9, "test_updated_comment")
// deleteComment(8)

// readCommentList(1)
