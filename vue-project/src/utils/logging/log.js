export async function addLogging(...log) {
    try { 
        // const combinedLog = {
        //     logs: log.map(log => String(log)), // 로그를 문자열로 변환하여 배열에 추가
        // };
        await fetch('/logging', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
    })
    } catch {
        console.error("Error occcured during sending log to server:", error);
    }
}