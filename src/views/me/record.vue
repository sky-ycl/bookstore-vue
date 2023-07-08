<template>
  <div>
    <el-card id="search">
      <el-input v-model="searchModel.recordId" placeholder="充值记录编号"></el-input>
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
          <template v-slot:="scope" >
            <el-button type="text" round  @click="deleteRecord(scope.row.recordId)" style="color: red">删除记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchModel.pageNo"
          :page-sizes="[5, 10, 15]"
          :page-size="searchModel.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import recordApi from '@/api/record'

export default {
  data() {
    return {
      index: 0,
      recordList: [],
      total: 0,
      searchModel: {
        pageNo: 1,
        pageSize: 5
      }
    }
  },
  computed: {

  },
  methods: {
    // 删除充值用户记录
    deleteRecord(recordId) {
      this.$confirm('确认删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recordApi.deleteRecord(recordId).then(response => {
          if (response.message === 'success') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // eslint-disable-next-line no-empty
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
          this.getRecordList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize
      this.getRecordList()
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo
    },
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

<style >

</style>

