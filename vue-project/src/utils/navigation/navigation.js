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

  function goToPath(path) {
    router.push(path); // 특정 경로로 이동
  }

  return {
    goBack,
    goToHome,
    goToPath,
  };
}
