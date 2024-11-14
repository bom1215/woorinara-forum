import * as yup from 'yup';

// 댓글 구조에 대한 스키마 정의
const commentSchema = yup.object({
  commentId: yup.number().positive().integer().required(),
  memberId: yup.number().positive().integer().required(),
  memberName: yup.string().required(),
  parentCommentId: yup.number().nullable(), // null이 허용되는 경우
  content: yup.string().required(),
  createdAt: yup.string().required(), // ISO 형식 문자열로 가정
  updatedAt: yup.string().required(),
  childList: yup.array().of(
    yup.lazy(() => commentSchema) // 재귀적으로 대댓글 구조를 허용
  ).required()
});

const commentsArraySchema = yup.array().of(commentSchema).required();

// 유효성 검사 실행 함수
export async function validateCommentList(data) {
  try {
    await commentsArraySchema.validate(data);
    console.log("유효한 데이터입니다.");
  } catch (error) {
    console.error("유효성 오류:", error.errors);
  }
}