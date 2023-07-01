<template>
  <div>
    <!--搜索栏    -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input v-model="searchModel.title" placeholder="书籍名称"></el-input>
          <el-input v-model="searchModel.author" placeholder="作者"></el-input>
          <el-button type="primary" round>查询</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="primary" icon="el-icon-plus" circle></el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--结果列表-->
    <el-card>
      <el-table :data="bookList" stripe style="width: 100%">
        <el-table-column prop="index" label="#" width="80"></el-table-column>
        <el-table-column prop="title" label="书名" width="180"></el-table-column>
        <el-table-column prop="author" label="作者" width="180"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="publicationDate" label="出版时间"></el-table-column>
        <el-table-column prop="quantity" label="库存"></el-table-column>
      </el-table>
    </el-card>

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
// eslint-disable-next-line no-unused-vars
import bookApi from '@/api/book'

export default {
  data() {
    return {
      total: 0,
      bookList: [],
      searchModel: {
        pageNo: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // getBookList() {
    //   bookApi.getListByPage(this.searchModel).then(response => {
    //     console.log(response.data.total)
    //     this.total = response.data.total
    //     this.bookList = response.data.books
    //   })
    // }
  },
  // mounted() {
  //   this.getBookList()
  // }
}
</script>

<style>
#search .el-input {
  width: 200px;
}
</style>
