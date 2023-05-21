<template>
  <div class="dashboard">
    <!-- 统计 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.title">
        <el-col :span="6">
          <StatisticalPanel :panel-data="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <el-card shadow="never" header="分类商品数量(饼图)">
          <PieEchart :data="categoryGoodsCount" />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="never" header="不同城市商品销量">
          <MapEchart :data="addressGoodsSale" />
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="never" header="分类商品数量(玫瑰图)">
          <RoseEchart :data="categoryGoodsCount" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 15px">
      <el-col :span="12">
        <el-card shadow="never" header="分类商品销量">
          <LineEchart :data="categoryGoodsSale" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" header="分类商品收藏">
          <BarEchart :data="categoryGoodsFavor" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { onMounted, ref } from 'vue'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'
import StatisticalPanel from '@/components/statistical-panel/statistical-panel.vue'
import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const amountList = ref([])

const categoryGoodsCount = ref([])
const categoryGoodsSale = ref([])
const categoryGoodsFavor = ref([])
const addressGoodsSale = ref([])

onMounted(() => {
  getAmountList().then((res) => {
    if (res.code === 200) {
      amountList.value = res.data
    }
  })

  getCategoryGoodsCount().then((res) => {
    if (res.code === 200) {
      categoryGoodsCount.value = res.data.map((item: any) => ({
        name: item.name,
        value: item.goodsCount
      }))
    }
  })

  getCategoryGoodsSale().then((res) => {
    if (res.code === 200) {
      categoryGoodsSale.value = res.data.map((item: any) => ({
        name: item.name,
        value: item.goodsCount
      }))
    }
  })

  getCategoryGoodsFavor().then((res) => {
    if (res.code === 200) {
      categoryGoodsFavor.value = res.data.map((item: any) => ({
        name: item.name,
        value: item.goodsFavor
      }))
    }
  })

  getAddressGoodsSale().then((res) => {
    if (res.code === 200) {
      addressGoodsSale.value = res.data.map((item: any) => ({
        name: item.address,
        value: item.count
      }))
    }
  })
})
</script>

<style scoped lang="less">
.dashboard {
  height: 700px;
  background-color: #f0f2f5;

  :deep(.el-card__header) {
    padding: 10px 20px !important;
    font-weight: 700;
  }

  .my-chart {
    width: 500px;
    height: 600px;
  }
}
</style>
