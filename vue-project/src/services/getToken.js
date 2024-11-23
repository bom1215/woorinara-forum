import { addLogging } from "@/utils/logging/log.js";


function getCookie(cookieName) {
    const cookieMap = Object.fromEntries(
        document.cookie.split("; ").map(cookie => cookie.split("="))
    );
    return cookieMap[cookieName] || null;
}

export async function fetchToken() {

  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  // addLogging("accessToken: ", accessToken)
  // addLogging("refreshToken: ", refreshToken)
  return accessToken
}
