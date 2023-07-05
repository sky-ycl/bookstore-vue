<template>
  <div>
    <el-card id="search">
      <el-input v-model="searchModel.record" placeholder="充值记录编号"></el-input>
      <el-button  @click="getRecordList" type="primary" round icon="el-icon-search">查询</el-button>
    </el-card>
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="index" label="#" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      searchModel: {

      }
    }
  }
}
</script>

<style>

</style>
