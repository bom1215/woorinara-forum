import dotenv from "dotenv";
import { validatePostDetail } from "../utils/validation/validReadPostDetail.js"
import { validateSearchPost } from "../utils/validation/validSearchPost.js"

export async function createPost(title, content, forumCategory, header) {
  dotenv.config();
  const url = process.env.POSTCREATE;
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
      Authorization: `Bearer ${process.env.ACCESSTOKEN}`,
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
  dotenv.config();
  const url = process.env.POSTGENERAL + `/${forumId}`;
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.ACCESSTOKEN}`,
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


export async function searchPost(word, page, size) {
  dotenv.config();
  const url = process.env.POSTGENERAL + `/list?word=${word}&page=${page}&size=${size}`;
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.ACCESSTOKEN}`,
    },
  }).then((response) => response.json())
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from searchPost:", result); 
        console.log("Content in search:",result.data.content)
        validateSearchPost(result)
        return result.data
      } else {
        console.error("Error occured in searchPost:",result)
      }
    })
    .catch((error) => {
      console.error("Error occured in searchPost:", error);
    });
}



export async function updatePost(forumId, title, content, header) {
  dotenv.config();
  const url = process.env.POSTUPDATE;
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
      Authorization: `Bearer ${process.env.ACCESSTOKEN}`,
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
  dotenv.config();
  const url = process.env.POSTDELETE;
  const requsetBody = {
    forumId: forumId,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESSTOKEN}`,
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
  dotenv.config();
  const url = process.env.POSTLIKES;
  const requsetBody = {
    forumId: forumId,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESSTOKEN}`,
    },
    body: JSON.stringify(requsetBody),
  }).then((response) => response.json())
    .then((result) => {
      if (result.status == 200) {
        console.log("Response from readLikes:", result); 
        return result.data
      } else {
        console.error("Error occured in readLikes:",result)
      }
    })
    .catch((error) => {
      console.error("Error occured in readLikes:", error);
    });
}


// createPost("test_title", "test_content", "QnA", "Visa");
// readPostDetail(23);

searchPost("", 0, 10)

// updatePost(1, "edited_title", "edited_content", "Visa")
// deletePost(23)
// readLikes(1)