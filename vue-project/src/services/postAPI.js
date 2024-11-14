import { validatePostDetail } from "../utils/validation/validReadPostDetail.js"
import { validateSearchPost } from "../utils/validation/validSearchPost.js"

export async function createPost(title, content, forumCategory, header) {
  const url = import.meta.env.VITE_POSTCREATE;
  if (forumCategory != "QnA") {
    header = null;
  }
  const requsetBody = {
    title: title,
    content: content,
    header: header,
    forumCategory: forumCategory,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
    },
    body: JSON.stringify(requsetBody),
  })
    .then((response) => {
      return response.json(); // 응답 Body를 한 번만 읽을 수 있음.
    })
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from createPost API:", result); 
      } else {
        console.error("Error occured in createPost:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in CreatePost:", error);
    });
}

// contentList 없을 경우 빈 리스트 반환
export async function readPostDetail(forumId) {
  const url = import.meta.env.VITE_POSTGENERAL + `/${forumId}`;
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
    },
  }).then((response) => response.json())
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from readPostDetail:", result); 
        validatePostDetail(result.data)
        return result.data
      } else {
        console.error("Error occured in readPostDetail:",result)
      }
    })
    .catch((error) => {
      console.error("Error occured in readPostDetail:", error);
    });
}

export async function readPostList(page, size) {
  const url = import.meta.env.VITE_POSTGENERAL + `/list?page=${page}&size=${size}`;
  console.log("url: ", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
      },
    });

    const result = await response.json();

    if (result.status === 200) {
      console.log("Response from readPostList:", result); 
      console.log("Content in readPostList:", result.data.content);
      validateSearchPost(result);
      return result.data;  // 함수의 끝에서 result.data 반환
    } else {
      console.error("Error occurred in readPostList:", result);
      return null;  // 에러 발생 시 null 반환
    }
  } catch (error) {
    console.error("Error occurred in readPostList:", error);
    return null;  // 네트워크 에러 발생 시 null 반환
  }
}

export async function searchPost(word, page, size) {
  const url = import.meta.env.VITE_POSTGENERAL + `/list?word=${word}&page=${page}&size=${size}`;
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
    },
  }).then((response) => response.json())
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from searchPost:", result); 
        console.log("Content in search:",result.data.content)
        validateSearchPost(result)
        return result.data;
      } else {
        console.error("Error occured in searchPost:",result)
      }
    })
    .catch((error) => {
      console.error("Error occured in searchPost:", error);
    });
}



export async function updatePost(forumId, title, content, header) {
  const url = import.meta.env.VITE_POSTUPDATE;
  const requsetBody = {
    forumId: forumId,
    title: title,
    content: content,
    header: header,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
    },
    body: JSON.stringify(requsetBody),
  })
    .then((response) => {
      return response.json(); // 응답 Body를 한 번만 읽을 수 있음.
    })
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from updatePost API:", result); 
      } else {
        console.error("Error occured in updatePost:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in updatePost:", error);
    });
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
      Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
    },
    body: JSON.stringify(requsetBody),
  })
    .then((response) => {
      return response.json(); // 응답 Body를 한 번만 읽을 수 있음.
    })
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from deletePost API:", result); 
      } else {
        console.error("Error occured in deletePost:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in deletePost:", error);
    });
}


export async function readLikes(forumId) {
  const url = import.meta.env.VITE_POSTLIKES;
  const requsetBody = {
    forumId: forumId,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESSTOKEN}`,
    },
    body: JSON.stringify(requsetBody),
  }).then((response) => response.json())
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from readLikes:", result); 
        if (isInteger(result.data)) {
          return result.data
        } else {
          console.error("Likes are not integer. Likes: ",result.data)
        }
      } else {
        console.error("Error occured in readLikes:",result)
      }
    })
    .catch((error) => {
      console.error("Error occured in readLikes:", error);
    });
}


// createPost("test_title", "test_content", "QnA", "Visa");
// readPostDetail(20);
// readPostList(0,)
// searchPost("내용", 0, 20)

// updatePost(29, "edited_title", "edited_content", "Visa")
// deletePost(29)
// readLikes(1)