<template>
  <div class="infinite-scroll-container">
    <div v-for="item in items" :key="item.id" class="item">
      {{ item.text }}
    </div>
    <div v-if="loading" class="loading">Loading more...</div>
    <div v-if="noMoreData" class="no-more-data">No more data to load</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // 초기 데이터
      page: 1, // 현재 페이지
      loading: false, // 로딩 상태
      noMoreData: false, // 데이터가 더 이상 없는 상태
    };
  },
  methods: {
    async loadMore() {
      if (this.loading || this.noMoreData) return; // 중복 호출 방지

      this.loading = true;
      try {
        const response = await fetch(
          `https://example.com/api/items?page=${this.page}`
        );
        const data = await response.json();

        if (data.items.length > 0) {
          this.items.push(...data.items); // 데이터 추가
          this.page += 1; // 페이지 증가
        } else {
          this.noMoreData = true; // 더 이상 데이터가 없음
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      const container = document.documentElement;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        this.loadMore();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.loadMore(); // 초기 데이터 로드
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.infinite-scroll-container {
  max-width: 600px;
  margin: 0 auto;
}
.item {
  padding: 20px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.loading {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
.no-more-data {
  text-align: center;
  padding: 20px;
  font-weight: bold;
  color: gray;
}
</style>
