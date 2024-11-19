import * as yup from 'yup';

// 댓글 구조에 대한 스키마 정의
const commentSchema = yup.object({
  commentId: yup.number().positive().integer().required(),
  memberId: yup.number().positive().integer().required(),
  nickName: yup.string().required(),
  parentCommentId: yup.number().nullable(), // null이 허용되는 경우
  content: yup.string().required(),
  createdAt: yup.string().required(), // ISO 형식 문자열로 가정
  updateAt: yup.string().required(),
  childList: yup.array().of(
    yup.lazy(() => commentSchema) // 재귀적으로 대댓글 구조를 허용
  ).required()
});

const forumHeaderSchema = yup.object({
  name: yup.string().oneOf(['Visa', 'ARC', 'Phone', 'Banking and Finance', 'Employment', 'Housing and Living', 'School', 'General Administrative', 'Others']).required(),
  color: yup.string().oneOf(['GREEN', 'BLUE']).required()
}).nullable();

// 상세조회 API 전체 데이터 스키마 정의
const postDetailSchema = yup.object({
  forumId: yup.number().positive().integer().required(), // 양의 정수
  title: yup.string().required(), // null 허용 안함
  content: yup.string().required(), // null 허용 안함
  commentList: yup.array().of(commentSchema).required(), // 댓글 리스트
  forumHeader: forumHeaderSchema,
  forumCategory: yup
    .string()
    .oneOf(['General', 'QnA', 'Jobs'])
    .required(),
  heartNum: yup.number().integer().min(0).required() // 0 또는 양의 정수
});

// 유효성 검사 실행 함수
export async function validatePostDetail(data) {
  try {
    await postDetailSchema.validate(data);
    console.log("유효한 데이터입니다.");
  } catch (error) {
    console.error("유효성 오류:", error.errors);
  }
}

// // 데이터 유효성 검사 실행 예시
// const forumData = {
//   forumId: 1,
//   title: 'test_title',
//   content: 'test_content',
//   commentList: [
//     {
//       commentId: 5,
//       memberId: 32,
//       nickName: "leeseokwoon5",
//       parentCommentId: null,
//       content: "This is Parent Comment",
//       createdAt: "2024-11-11T21:34:43.39316",
//       updatedAt: "2024-11-11T21:34:43.39316",
//       childList: [
//         {
//           commentId: 6,
//           memberId: 32,
//           nickName: "leeseokwoon5",
//           parentCommentId: 5,
//           content: "This is Child Comment1",
//           createdAt: "2024-11-11T21:36:05.16010",
//           updatedAt: "2024-11-11T21:36:05.16010",
//           childList: []
//         },
//         {
//           commentId: 8,
//           memberId: 32,
//           nickName: "leeseokwoon5",
//           parentCommentId: 5,
//           content: "This is Child Comment1",
//           createdAt: "2024-11-11T22:01:41.60572",
//           updatedAt: "2024-11-11T22:01:41.60572",
//           childList: []
//         }
//       ]
//     },
//     {
//       commentId: 7,
//       memberId: 32,
//       nickName: "leeseokwoon5",
//       parentCommentId: null,
//       content: "This is Parent Comment",
//       createdAt: "2024-11-11T22:01:28.41458",
//       updatedAt: "2024-11-11T22:01:28.41458",
//       childList: [
//         {
//           commentId: 9,
//           memberId: 32,
//           nickName: "leeseokwoon5",
//           parentCommentId: 7,
//           content: "This is Child Comment1",
//           createdAt: "2024-11-11T22:01:50.68713",
//           updatedAt: "2024-11-11T22:01:50.68713",
//           childList: []
//         }
//       ]
//     }
//   ],
//   forumHeader: "Visa",
//   forumCategory: 'General',
//   heartNum: 0
// };

// // 유효성 검사 실행
// validatePostDetail(forumData);
