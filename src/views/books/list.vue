<template>
  <div>
    <!--搜索栏-->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input v-model="searchModel.title" placeholder="书名"></el-input>
          <el-input v-model="searchModel.author" placeholder="作者"></el-input>
          <el-button @click="getBookList" type="primary" round icon="el-icon-search">查询</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="primary" icon="el-icon-plus" circle></el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--结果列表-->
    <el-card>
      <el-table :data="bookList" stripe style="width: 100%">
        <el-table-column label="#" width="80">
          <template v-slot="scope">
            {{ (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="书名" width="180"></el-table-column>
        <el-table-column prop="author" label="作者" width="200"></el-table-column>
        <el-table-column prop="price" label="价格" width="150"></el-table-column>
        <el-table-column prop="quantity" label="库存" width="420"></el-table-column>
        <el-table-column prop="id" label="操作" header-align="center">
          <template v-slot:="scope">
            <el-button type="primary" @click="getBookDetail(scope.row.id)" round>查看详情</el-button>
            <el-button type="warning" @click="addShopCart(scope.row.id)" round>加入购物车</el-button>
            <el-button type="danger" round @click="showBuyDialog(scope.row)">立即购买</el-button>
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
    <!--表单-->
    <el-dialog title="购买书籍" :visible.sync="dialogFormVisible">
      <el-form :model="buyBookDetail">
        <template>
          书籍名称:
          <el-input :placeholder=buyBookDetail.title :disabled="true" class="inputWith"></el-input>
        </template>
        <p></p>
        <template>
          书籍价格:
          <el-input :placeholder="(buyBookDetail.price * num).toFixed(2)" :disabled="true" class="inputWith"></el-input>
          <div></div>
        </template>
        <p></p>
        <template>
          购买数量:
          <el-input-number size="small" v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBuyBook">取 消</el-button>
        <el-button type="primary" @click="buyBook(buyBookDetail.id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import bookApi from '@/api/book'
import shopApi from '@/api/shop'
import shopUtil from '@/utils/shopUtil'
import messageUtil from '@/utils/messageUtil'

export default {
  data() {
    return {
      dialogTableVisible: false,
      message: '',
      bookDetail: [],
      total: 0,
      bookList: [],
      searchModel: {
        pageNo: 1,
        pageSize: 5
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      num: 1,
      // 购买书籍的信息
      buyBookDetail: {},
      // 购买书籍的内容
      buyBookData: {
        num: this.num,
        id: ''
      }

    }
  },
  methods: {
    // 购买书籍
    buyBook(id) {
      this.buyBookData.id = id
      bookApi.buyBook(id,this.num).then(response => {

      })
      this.dialogFormVisible = false
    },
    // 取消购买书籍
    cancelBuyBook() {
      this.dialogFormVisible = false
      messageUtil.warn(this, '取消成功')
    },
    showBuyDialog(row) {
      this.dialogFormVisible = true
      this.buyBookDetail = row
    },
    // 加入购物车
    addShopCart(id) {
      shopApi.addShopCart(id).then(response => {
        // eslint-disable-next-line no-empty
        if (response.message === 'success') {
          shopUtil.success(this, '加入成功')
          // eslint-disable-next-line no-empty
        } else {
          shopUtil.fail(this, response.message)
        }
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
      this.getBookList()
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo
      this.getBookList()
    },
    // 得到书籍列表
    getBookList() {
      bookApi.getListByPage(this.searchModel).then(response => {
        this.total = response.data.total
        this.bookList = response.data.bookList
      })
    }
  },
  mounted() {
    this.getBookList()
  }
}
</script>

<style>
.inputWith {
  width: 150px;
}
</style>
