import { defineStore } from "pinia";
import { ref } from "vue";

export const useReplyStore = defineStore("reply", () => {

    
    
    const time = ref("")
    const nickName = ref("")
    const content = ref("")
    const childList = ref([])
    const forumId = ref("")
    const parentCommentId = ref("")
    return {time, nickName, content, childList, forumId, parentCommentId}
}, {
    persist: {
        storage: sessionStorage,
        pick: undefined, //위에 저장된 모든 데이터 선택 sessionStore에 유지
    },
});

