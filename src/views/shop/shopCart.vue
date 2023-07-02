<template>
  <div>
    <!--搜索栏-->
    <el-card id="search">
      <el-row>
        <el-col :span="12">
          <el-input v-model="searchModel.title" placeholder="书名查询"></el-input>
          <el-button @click="getShopList"  type="primary" round icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--结果列表-->
    <el-card>
      <el-table :data="shopList" stripe style="width: 100%">
        <el-table-column prop="index" label="#" width="100">
          <template v-slot="scope">
            {{(searchModel.pageNo-1) * searchModel.pageSize + scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="书名" width="180"></el-table-column>
        <el-table-column prop="price" label="价格" width="180"></el-table-column>
        <el-table-column prop="createdAt" label="加入购物车时间" width="250px"></el-table-column>
        <el-table-column prop="quantity" label="数量" width="330px"></el-table-column>
        <el-table-column prop="bookId" label="操作" header-align="center">
          <template v-slot:="scope">
            <el-button type="primary" @click="getBookDetail(scope.row.id)" round>查看详情</el-button>
            <el-button type="warning" @click="cancelShop(scope.row.id)"  round >取消购物车</el-button>
            <el-button type="danger" round>立即购买</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--详情列表-->
    <el-dialog title="书籍详情" :visible.sync="dialogTableVisible">
      <el-table :data="bookDetail">
        <el-table-column property="title" label="书名" width="150"></el-table-column>
        <el-table-column property="author" label="作者" width="200"></el-table-column>
        <el-table-column property="publicationDate" label="出版时间" width="200"></el-table-column>
        <el-table-column property="description" label="书本描述"></el-table-column>
      </el-table>
    </el-dialog>
    <!--分页-->
    <el-card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchModel.pageNo"
        :page-sizes="[5, 10, 15]"
        :page-size="searchModel.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import shopApi from '@/api/shop'
import bookApi from '@/api/book'
import shopUtil from '@/utils/shopUtil';
export default {
  data() {
    return {
      total: 0,
      shopList: [],
      bookDetail: [],
      dialogTableVisible: false,
      searchModel: {
        pageNo: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    // 取消购物车
    cancelShop(id) {
      shopApi.cancelShopCart(id).then(response => {
        // eslint-disable-next-line no-empty
        if (response.message === 'success') {
          shopUtil.success(this, '取消成功')
          // eslint-disable-next-line no-empty
        } else {
          shopUtil.fail(this, '取消失败')
        }
        this.getShopList()
      })
    },
    // 得到书籍详细信息
    getBookDetail(id) {
      bookApi.getBookById(id).then(response => {
        this.bookDetail = [response.data.book]
        console.log(response.data)
      })
      this.dialogTableVisible = true
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize
      this.getShopList()
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo
      this.getShopList()
    },
    // 得到书籍列表
    getShopList() {
      shopApi.getShopList(this.searchModel).then(response => {
        this.total = response.data.total
        this.shopList = response.data.shoppingCartList
        console.log(response.data)
      })
    }
  },
  mounted() {
    this.getShopList()
  }
}
</script>

<style>
#search .el-input {
  width: 220px;
  margin-right: 20px;
}
</style>
