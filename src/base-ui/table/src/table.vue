<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ITableItem } from '..'
import { ref } from 'vue'
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  tableCount: {
    type: Number,
    default: 0
  },
  query: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 })
  },
  tableItems: {
    type: Array as PropType<ITableItem[]>,
    default: () => []
  },
  title: {
    type: String,
    default: '默认标题'
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showSelectColumn: {
    type: Boolean,
    default: true
  },
  showIndexColumn: {
    type: Boolean,
    default: true
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:query'])

const handleSizeChange = (pageSize: number) => {
  emit('update:query', { ...props.query, pageSize })
}

const handleCurrentChange = (currentPage: number) => {
  emit('update:query', { ...props.query, currentPage })
}
</script>

<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="operate">
          <slot name="operate"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        width="60"
        align="center"
      />

      <!-- 自定义列 -->
      <template v-for="item in tableItems" :key="item.label">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template v-slot="{ row }">
            <slot :name="item.slotName" :row="row" :prop="item.prop ?? ''">
              {{ row[item.prop ?? ''] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :current-page="query.currentPage"
          :page-size="query.pageSize"
          :page-sizes="[10, 20, 30]"
          small
          layout="total, sizes, prev, pager, next"
          :total="tableCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;

  .title {
    font-size: 20px;
    font-weight: 700;
  }
}

.footer {
  margin-top: 15px;
  .el-pagination {
    justify-content: flex-end;
  }
}
</style>
