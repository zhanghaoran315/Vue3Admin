<script lang="ts" setup name="list">
import ListTable from './list-table.vue'
import ListDetail from './list-detail.vue'
import ListPanel from './list-panel.vue'
import { ref } from 'vue'

const comp = {
  ListTable,
  ListDetail,
  ListPanel
}

const Component = ref('ListTable')
const rowData = ref({})

const changeComp = (cpnName: string, row: any) => {
  Component.value = cpnName
  console.log('row: ', row)
  rowData.value = row
}
</script>

<template>
  <div class="list">
    <transition name="zhr" mode="out-in">
      <!-- <keep-alive> -->
      <component
        :is="comp[Component]"
        :rowData="rowData"
        @changeComp="changeComp"
      ></component>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<style scoped lang="less">
.zhr-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.zhr-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.zhr-enter-active,
.zhr-leave-avtive {
  transition: all 500ms ease;
}
</style>
