<script setup>
import { ref, watch } from "vue";
import { createPost, updatePost } from "@/services/postAPI.js";
import { useNavigation } from "@/utils/navigation/navigation.js";
import Headers from "../components/Headers.vue";
import Modal from "../components/shared/Modal.vue";

const { goToPath, goBack, replace } = useNavigation();

const props = defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
  forumCategory: {
    type: String,
    default: "",
  },
  header: {
    type: String,
    default: "",
  },
  headerColor: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  postContent: {
    type: String,
    default: "",
  },
  forumId: {
    type: String,
    default: "",
  },
});

const localforumCategory = ref(props.forumCategory);
const localheader = ref(props.header);
const localtitle = ref(props.title);
const localpostContent = ref(props.postContent);
const header_option = ref([
  "visa",
  "Banking and Finance",
  "General Administrative",
  "ARC",
  "Phone",
  "Housing and Living",
  "School",
  "Employment",
  "others",
]);

function resize(event) {
  const element = event.target;
  element.style.height = "18px"; // 초기 높이 설정
  element.style.height = `${element.scrollHeight}px`; // 내용에 맞게 높이 설정
}

function navigateToPost(forumId) {
  // goToPath(`/post/${forumId}`);
  replace(`/post/${forumId}`);
  
}

async function complete() {
  // 필수 입력값 확인
  if (
    !localtitle.value ||
    !localpostContent.value ||
    !localforumCategory.value ||
    (localforumCategory.value === "QnA" && (!localheader || localheader === ""))
  ) {
    console.error("All fields are required.");
    return;
  }

  // 게시글 생성 함수 호출
  try {
    const response = props.edit
      ? await updatePost(
          props.forumId,
          localtitle.value,
          localpostContent.value,
          localforumCategory.value === "QnA" ? localheader.value : null // QnA가 아니면 header를 null로 설정
        )
      : await createPost(
          localtitle.value,
          localpostContent.value,
          localforumCategory.value,
          localforumCategory.value === "QnA" ? localheader.value : null // QnA가 아니면 header를 null로 설정
        );
    if (response) {
      navigateToPost(response.forumId);
    }
  } catch (error) {
    console.error("Error occurred while creating the post:", error);
  }
}

const isHeaderSelected = ref(false); // 헤더 표시 여부

// Watcher로 헤더 선택 상태를 업데이트
watch(localheader, (newValue) => {
  if (newValue) {
    isHeaderSelected.value = true; // 헤더 선택 완료
  }
});

const isModalVisible = ref(false); // 모달 표시 여부 관리
const modalType = ref(""); // 모달의 타입 설정

function showModal(type) {
  modalType.value = type; // 타입 설정 (e.g., "delete")
  isModalVisible.value = true; // 모달 표시
}

function closeModal() {
  isModalVisible.value = false; // 모달 숨기기
}

async function back() {
    goBack(); 
    isModalVisible.value = false; // 모달 숨기기
}


</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="postHeader">
      <button class="back-button">
        <img alt="Cancel logo" src="../assets/cancel.svg" @click="showModal('back')"/>
        <!-- Modal -->
          <Modal
            v-if="isModalVisible"
            :type="modalType"
            @close="closeModal"
            @delete="back"
          />
      </button>
      <h2>Writing</h2>
      <button class="completion-button" @click="complete">Completion</button>
    </div>

    <!-- Form Content -->
    <div class="form">
      <select
        v-if="edit === false"
        class="select-board"
        v-model="localforumCategory"
      >
        <option value="" disabled selected>Select a Board</option>
        <option>General</option>
        <option>QnA</option>
        <option>Jobs</option>
      </select>

      <h1 v-if="edit === true">{{ forumCategory }}</h1>

      <div>
        <!-- 드롭다운 메뉴 -->
        <select
          v-if="localforumCategory === 'QnA' && !isHeaderSelected"
          :class="{ localheader: localforumCategory === 'QnA' }"
          v-model="localheader"
        >
          <option value="" disabled>Select a Header</option>
          <option v-for="option in header_option" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <!-- 선택된 헤더 -->
        <Headers
          v-if="localforumCategory === 'QnA' && isHeaderSelected"
          :text="localheader"
          :color="headerColor"
          @click="isHeaderSelected = false"
          class="header-display"
        />
      </div>

      <textarea
        v-model="localtitle"
        @input="resize"
        class="title-input"
        placeholder="Please enter the title."
        maxlength="300"
      />
      <textarea
        v-model="localpostContent"
        @input="resize"
        class="postContent-input"
        placeholder="Ask any questions or stories you're curious about."
        maxlength="2000"
      />
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.postHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.back-button,
.completion-button {
  background: none;
  border: none;
  font-size: 16px;
}

.form {
  margin-top: 20px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.select-board,
.title-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: none;
}

.postContent-input {
  color: #090909;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 부모 요소 너비를 넘지 않도록 설정 */
  border: none;
}
.header {
  border: none;
}
</style>
