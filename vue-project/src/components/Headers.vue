<script setup>
import { reactive } from 'vue';
const props = defineProps({
  text: String,
  color: String
})

const colorObject = reactive({
    backgroundColor: props.color === 'BLUE' ? '#E0EFFF' : '#E0F4E0',
    color: props.color === 'BLUE' ? '#4A90E2': '#33AA66'
})

</script>
<template>
  <div class="header" :style="colorObject">{{ text }}</div>
</template>
<style scoped>
.header {
  display: inline-block;
  padding: 4px 12px;
  font-size: 14px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
    }
</style>
