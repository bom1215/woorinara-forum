export function formatDate(input) {
    // 입력 문자열을 Date 객체로 변환
    const date = new Date(input);

    // 연도, 월, 일, 시, 분, 초 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 원하는 형식으로 변환
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

// // 예제 사용
// const input = "2024-11-16T17:28:40.67861";
// const output = formatDate(input);
// console.log(output); // "2024.11.16 17:28:40"
