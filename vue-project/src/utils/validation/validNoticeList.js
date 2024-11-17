import * as yup from "yup";

// 알림 구조에 대한 스키마 정의
const noticeSchema = yup.object({
  id: yup.number().positive().integer().required(),
  memberId: yup.number().positive().integer().required(),
  memberName: yup.string().required(),
  content: yup.string().required(),
  refId: yup.string().required(),
  isRead: yup.boolean().required(),
  createdAt: yup.string().required(), // ISO 형식 문자열로 가정
  updatedAt: yup.string().required(),
});

const noticeArraySchema = yup.array().of(noticeSchema).required();

// 유효성 검사 실행 함수
export async function validateNoticeList(data) {
  try {
    await noticeArraySchema.validate(data);
    console.log("유효한 데이터입니다.");
  } catch (error) {
    console.error("유효성 오류:", error.errors);
  }
}
