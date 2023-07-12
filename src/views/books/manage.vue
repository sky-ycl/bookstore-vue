<template>
  <div>
    <el-card id="search">
      <el-input v-model="searchModel.title" placeholder="书名"></el-input>
      <el-button @click="getUserBookList" type="primary" round icon="el-icon-search">查询</el-button>
    </el-card>
    <el-card>
      <template>
        <el-table :data="userBookList" stripe style="width: 100%">
          <el-table-column prop="index" label="#" width="120">
            <template v-slot="scope">
              {{scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="title" label="书籍" width="180"></el-table-column>
          <el-table-column prop="author" label="作者" width="200"></el-table-column>
          <el-table-column prop="number" label="数量" width="200"></el-table-column>
          <el-table-column prop="purchaseDate" label="购买时间"></el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import bookApi from '@/api/book';

export default {
  data() {
    return {
      userBookList: [],
      searchModel: {}
    }
  },
  methods: {
    getUserBookList() {
      bookApi.getUserBookList(this.searchModel).then(respnse => {
        this.userBookList = respnse.data
      })
    }
  },
  mounted() {
    this.getUserBookList()
  }
}
</script>

<style>

</style>
