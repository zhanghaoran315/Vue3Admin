<script setup lang="ts" name="category">
import { ref, onMounted } from 'vue'
import SliderTools from './SliderTools.js'

const sliderDone = ref(false)

onMounted(() => {
  let slider = new SliderTools({
    el: document.querySelector('.slider')
  })
  slider.on('complete', function () {
    sliderDone.value = true
  })
})
</script>

<template>
  <div class="category">
    <h2>category</h2>
    <div class="content">
      <div class="slider"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.category {
  height: 600px;
  padding: 20px;

  h2 {
    text-align: center;
  }

  .content {
    display: flex;
    justify-content: center;

    padding-top: 20px;

    .slider {
      width: 300px;
      height: 50px;
    }
  }
}
</style>
