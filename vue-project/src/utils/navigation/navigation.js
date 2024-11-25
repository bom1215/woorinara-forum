// src/utils/navigation.js
import { useRouter } from "vue-router";

export function useNavigation() {
  const router = useRouter();

  function goBack() {
    router.go(-1); // 뒤로가기
  }

  function goToHome() {
    router.push("/"); // 홈으로 이동
  }
  function replace(prePath) {
    router.replace(prePath)
  }

  function goToPath(path) {
    router.push(path); // 특정 경로로 이동
  }
  function goToPathWithParams(name, { forumId, query }) {
  router.push({
    name: name,
    params: { forumId }, // URL 파라미터
    query: query, // 쿼리 문자열
  });
}

  return {
    goBack,
    goToHome,
    goToPath,
    goToPathWithParams,
    replace
  };
}
