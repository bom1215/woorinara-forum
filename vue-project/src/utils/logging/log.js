
export async function addLogging(...log) {
    try { 
        // 모든 파라미터를 문자열로 합치기
        const combinedLogs = log.map(item => String(item)).join(' ');

        await fetch(`${import.meta.env.VITE_SERVER}/logging`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedLogs),
    })
    } catch {
        console.error("Error occcured during sending log to server:", error);
    }
}