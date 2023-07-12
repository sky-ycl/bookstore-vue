<template>
  <div>
    <!--  搜索栏-->
    <el-card id="search">
      <el-input v-model="searchModel.orderId" placeholder="订单号"></el-input>
      <el-button @click="getUserOrderList" type="primary" round icon="el-icon-search">查询</el-button>
    </el-card>

    <!--列表栏-->
    <el-card>
      <el-table :data="userOrderData" stripe style="width: 100%">
        <el-table-column prop="index" label="#" width="80">
          <template v-slot="scope">
            {{ (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="orderId" label="订单" width="200"></el-table-column>
        <el-table-column prop="bookTitle" label="书名" width="120"></el-table-column>
        <el-table-column prop="bookNumber" label="数量" width="120"></el-table-column>
        <el-table-column prop="address" label="是否使用优惠劵" width="180">
          <template v-slot:="scope">
            <el-tag>{{ scope.row.isCouponUsed === 0 ? '未使用' : '使用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="付款金额(元)" width="220"></el-table-column>
        <el-table-column prop="orderDate" label="付款时间" width="380">
          <template v-slot:="scope">
            {{ TimeUtil.formatDate(new Date(scope.row.orderDate)) }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template v-slot:="scope">
            <el-button type="text" round @click="deleteOrder(scope.row.orderId)" style="color: red">删除记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分页 -->
    <el-card>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchModel.pageNo"
          :page-sizes="[5, 10,15 ]"
          :page-size="searchModel.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>

</template>

<script>
import orderApi from '@/api/order'
import TimeUtil from '@/utils/timeUtil'

export default {
  data() {
    return {
      total: 0,
      searchModel: {
        pageNo: 1,
        pageSize: 5
      },
      userOrderData: []
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize
      this.getOrderData()
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo
      this.getOrderData()
    },
    getUserOrderList() {
      this.getOrderData()
    },
    deleteOrder(orderId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderApi.deleteOrder(orderId).then(response => {
          if (response.message === 'success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getOrderData()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getOrderData() {
      orderApi.getOrderData(this.searchModel).then(response => {
        this.userOrderData = response.data.userOrderList
      })
    }
  },
  computed: {
    TimeUtil() {
      return TimeUtil
    },
  },
  mounted() {
    this.getOrderData()
  }
}
</script>

<style>

</style>
