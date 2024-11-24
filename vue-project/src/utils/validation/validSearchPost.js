import * as yup from 'yup';
// import { validatePostDetail } from "/readPostDetail.js";
import { addLogging } from "@/utils/logging/log.js";


// 댓글 구조에 대한 스키마 정의
const commentSchema = yup.object({
  commentId: yup.number().positive().integer().required(),
  memberId: yup.number().positive().integer().required(),
  nickName: yup.string().required(),
  parentCommentId: yup.number().nullable(), // null이 허용되는 경우
  content: yup.string().required(),
  createdAt: yup.string().required(), // ISO 형식 문자열로 가정
  updatedAt: yup.string().required(),
  isMine: yup.boolean().required(),
  childList: yup.array().of(
    yup.lazy(() => commentSchema) // 재귀적으로 대댓글 구조를 허용
  ).required()
});

const forumHeaderSchema = yup.object({
  name: yup.string().oneOf(['Visa', 'ARC', 'Phone', 'Banking and Finance', 'Employment', 'Housing and Living', 'School', 'General Administrative', 'Others']).required(),
  color: yup.string().oneOf(['GREEN', 'BLUE']).required()
}).nullable();

// content (post 내용) 스키마 정의
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
  heartNum: yup.number().integer().min(0).required(), // 0 또는 양의 정수
  viewCnt: yup.number().integer().min(0).required(),
  nickName: yup.string().required(),
  createdAt: yup.string().required(), // ISO 형식 문자열로 가정
  updatedAt: yup.string().required(),
  isMine: yup.boolean().required(),
  isHeart: yup.boolean().required(),
});



// 유효성 검사 스키마 정의
const pageableSchema = yup.object({
  pageNumber: yup.number().integer().min(0).required(), // 0 이상의 정수 //현재 페이지 번호
  pageSize: yup.number().integer().min(0).required(), // 0 이상의 정수 //현재 페이즈 사이즈
});

const responseSchema = yup.object({
  data: yup.object({
    content: yup.array().of(postDetailSchema).required(), 
    pageable: pageableSchema.required(),
    last: yup.boolean().required(), // 마지막 페이지 유무
    totalElements: yup.number().integer().min(0).required(), //총 게시글 갯수 
    totalPages: yup.number().integer().min(1).required(), //총 페이지 번호
    first: yup.boolean().required(), // 첫번쨰 페이지 유무
  }).required(),
});

// 유효성 검사 함수
export async function validateSearchPost(data) {
  try {
    await responseSchema.validate(data);
    addLogging("유효한 데이터입니다.");
  } catch (error) {
    addLogging("유효성 오류:", error.errors);
  }
}

// // 예제 데이터 유효성 검사
// const apiResponse = {
//   data: {
//     content: [
//       {
//         forumId: 21,
//         title: "마지막에 만들어진내용",
//         content: "내용내용내용",
//         commentList: [
//           {
//             commentId: 2,
//             memberId: 2,
//             nickName: "lee",
//             parentCommentId: null,
//             content: "This is Parent Comment",
//             createdAt: "2024-11-13T19:13:13.30349",
//             updatedAt: "2024-11-13T19:13:13.30349",
//             childList: [
//               {
//                 commentId: 3,
//                 memberId: 2,
//                 nickName: "lee",
//                 parentCommentId: 2,
//                 content: "This is Parent Comment",
//                 createdAt: "2024-11-13T19:14:04.46975",
//                 updatedAt: "2024-11-13T19:14:04.46975",
//                 childList: [],
//               },
//             ],
//           },
//         ],
//         forumHeader: null,
//         forumCategory: "General",
//         heartNum: 0,
//       },
//     ],
//     pageable: {
//       pageNumber: 0,
//       pageSize: 5,
//       sort: {
//         empty: true,
//         sorted: false,
//         unsorted: true,
//       },
//       offset: 0,
//       paged: true,
//       unpaged: false,
//     },
//     last: true,
//     totalElements: 1,
//     totalPages: 1,
//     first: true,
//     size: 5,
//     number: 0,
//     sort: {
//       empty: true,
//       sorted: false,
//       unsorted: true,
//     },
//     numberOfElements: 1,
//     empty: false,
//   },
// };

// // 유효성 검사 실행
// validateSearchPost(apiResponse);
