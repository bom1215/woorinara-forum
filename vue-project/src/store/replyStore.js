import { defineStore } from "pinia";
import { ref } from "vue";

export const useReplyStore = defineStore("reply", () => {

    
    
    const time = ref("")
    const nickName = ref("")
    const content = ref("")
    const childList = ref([])
    const forumId = ref("")
    const parentCommentId = ref("")
    const practice = ref("")
    return {time, nickName, content, childList, forumId, parentCommentId, practice}
});
