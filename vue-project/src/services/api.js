import dotenv from "dotenv";

async function createPost(title, content, forumCategory, header) {
  dotenv.config();
  const url = process.env.POSTCREATE;
  if (forumCategory == "QnA") {
    header = null;
  }
  const requsetBody = {
    title: title,
    content: content,
    header: header,
    forumCategory: forumCategory,
  };
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESSTOKEN}`,
    },
    body: JSON.stringify(requsetBody),
  })
    .then((response) => {
      return response.json(); // 응답 Body를 한 번만 읽음
    })
    .then((data) => {
      console.log("Response from CreateData API:", data); 
    })
    .catch((error) => {
      console.error("Error occured in CreatePost:", error);
    });
}

createPost("testtitle", "df", "QnA", "testheader");
