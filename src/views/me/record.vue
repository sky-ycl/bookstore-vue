<template>
  <div>
    <el-card id="search">
      <el-input v-model="searchModel.record" placeholder="充值记录编号"></el-input>
      <el-button @click="getRecordList" type="primary" round icon="el-icon-search">查询</el-button>
    </el-card>
    <el-card>
      <el-table :data="recordList" stripe style="width: 100%">
        <el-table-column prop="index" label="#" width="80">
          <template v-slot="scope">
            {{ (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="150"></el-table-column>
        <el-table-column prop="money" label="充值金额" width="150"></el-table-column>
        <el-table-column prop="rechargeTime" label="充值时间" width="250"></el-table-column>
        <el-table-column prop="recordId" label="支付记录编号" width="600"></el-table-column>
        <el-table-column prop="id" label="操作">
          <template v-slot:="scope">
            <el-button type="primary" round>删除记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import recordApi from '@/api/record'

export default {
  data() {
    return {
      recordList: [],
      total: 0,
      searchModel: {
        pageNo: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    getRecordList() {
      recordApi.getRecordList(this.searchModel).then(response => {
        this.total = response.data.total
        this.recordList = response.data.recordList
      })
    }
  },
  mounted() {
    this.getRecordList()
  }
}
</script>

<style>

</style>
