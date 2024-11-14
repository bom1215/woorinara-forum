
export function timeAgo(updatedAt) {
  const now = new Date();
  const updatedTime = new Date(updatedAt);
  const diffMs = now - updatedTime; // 밀리초 차이 계산
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  } else {
    return `Just now`;
  }
}

// // 예시 사용
// const updatedAt = "2024-11-13T17:35:04.93397";
// console.log(timeAgo(updatedAt));  // "1 days ago" 또는 "5 hours ago" 등의 형식으로 출력
