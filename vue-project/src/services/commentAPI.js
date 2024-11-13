import dotenv from "dotenv";

export async function createParentComment(forumId, content) {
  dotenv.config();
  const url = process.env.COMMENTCREATE;
  const requsetBody = {
    forumId: forumId,
    content: content,
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
        console.log("Response from createParentComment API:", result);
      } else {
        console.error("Error occured in createParentComment:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in createParentComment:", error);
    });
}

export async function createChildComment(forumId, parentCommentId, content) {
  dotenv.config();
  const url = process.env.COMMENTCREATE;
  const requsetBody = {
    forumId: forumId,
    parentCommentId: parentCommentId,
    content: content,
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
        console.log("Response from createChildComment API:", result);
      } else {
        console.error("Error occured in createChildComment:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in createChildComment:", error);
    });
}

export async function updateComment(commentId, content) {
  dotenv.config();
  const url = process.env.COMMENTUPDATE;
  const requsetBody = {
    commentId: commentId,
    content: content,
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
        console.log("Response from updateComment API:", result);
      } else {
        console.error("Error occured in updateComment:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in updateComment:", error);
    });
}

export async function deleteComment(CommentId) {
  dotenv.config();
  const url = process.env.COMMENTDELETE;
  const requsetBody = {
    CommentId: CommentId,
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
        console.log("Response from deleteComment API:", result);
      } else {
        console.error("Error occured in deleteComment:", result);
      }
    })
    .catch((error) => {
      console.error("Error occured in deleteComment:", error);
    });
}


// createParentComment(1, "test_parent_comment"); //부모 댓글
// createParentComment(1, 1,"test_child_comment"); // 자식 댓글


updateComment(1, "test_updated_comment")
// deleteComment(1)