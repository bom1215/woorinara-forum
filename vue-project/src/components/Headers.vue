<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: String,
  color: String
})

if (props.color =='blue'){
  header.background-color == '#E0EFFF'
header.color: #4A90E2;

}else{
  color: #33AA66;
  header.background-color == '#E0F4E0'
}
//예시
// https://vuejs.org/guide/essentials/class-and-style
// const styleObject = reactive({
//   color: 'red',
//   fontSize: '30px'
// })

// color에 따라 배경색을 설정하는 computed 속성
const headerClass = computed(() => {
  return props.color === 'blue' ? 'header blue-color' : 'header green-color';
});

</script>
<template>
  <div class="headerClass" >{{ text }}</div>
</template>
<style scoped>
.header {
  display: inline-block;
  padding: 4px 12px;
  font-size: 14px;
  /* color: #4A90E2; */
  /* background-color: #E0EFFF; */
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
    }

.blue-color {
  color: #4A90E2;
  background-color: #E0EFFF;
}

.green-color {
  color: #33AA66;
  background-color: #E0F4E0;
}
</style>
