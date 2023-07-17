<template>
  <div>
    <!--搜索栏-->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input v-model="searchModel.title" placeholder="书名" />
          <el-input v-model="searchModel.author" placeholder="作者"/>
          <el-button type="primary" round icon="el-icon-search" @click="getBookList">查询</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="primary" icon="el-icon-plus" circle/>
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
        <el-table-column prop="title" label="书名" width="180"/>
        <el-table-column prop="author" label="作者" width="200"/>
        <el-table-column prop="price" label="价格(元)" width="150"/>
        <el-table-column prop="quantity" label="库存" width="420"/>
        <el-table-column prop="id" label="操作" header-align="center">
          <template v-slot:="scope">
            <el-button type="primary" round @click="getBookDetail(scope.row.id)">查看详情</el-button>
            <el-button type="warning" round @click="addShopCart(scope.row.id)">加入购物车</el-button>
            <el-button type="danger" round @click="showBuyDialog(scope.row)">立即购买</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--详情列表-->
    <el-dialog title="书籍详情" :visible.sync="dialogTableVisible">
      <el-table :data="bookDetail">
        <el-table-column property="title" label="书名" width="150"/>
        <el-table-column property="author" label="作者" width="200"/>
        <el-table-column property="publicationDate" label="出版时间" width="200"></el-table-column>
        <el-table-column property="description" label="书本描述"/>
      </el-table>
    </el-dialog>
    <!--分页-->
    <el-card>
      <el-pagination
        :current-page="searchModel.pageNo"
        :page-sizes="[5, 10, 15]"
        :page-size="searchModel.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!--购买表单-->
    <el-dialog title="购买书籍" :visible.sync="dialogFormVisible">
      <el-form :model="buyBookDetail">
        <template>
          书籍名称:
          <el-input :placeholder="buyBookDetail.title" :disabled="true" class="inputWith"/>
        </template>
        <p/>
        <template>
          书籍价格:
          <el-input :placeholder="(buyBookDetail.price * num).toFixed(2)" :disabled="true" class="inputWith"/>
          <div/>
        </template>
        <p/>
        <template>
          购买数量:
          <el-input-number v-model="num" size="small" :min="1" :max="10" label="描述文字"/>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="showCouponForm">查看优惠券</el-button>
        <el-button @click="cancelBuyBook">取 消</el-button>
        <el-button type="primary" @click="buyBook(buyBookDetail.id)">确 定</el-button>
      </div>
    </el-dialog>
    <!--优惠卷表单-->
    <el-dialog title="优惠券" :visible.sync="couponFormVisible">
      <div class="coupon-container">
        <div v-if="coupons.length === 0 || coupons===null">
          <p>暂无可用优惠券</p>
        </div>

        <div v-else>
          <el-radio-group v-model="selectedCoupon">
            <el-radio v-for="coupon in coupons" :label="coupon">
              {{ coupon.couponType === 1 ? '限时优惠卷' : '满减优惠卷' }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>

      <div v-if="selectedCoupon" class="coupon-info">
        <p><strong>描述: {{ selectedCoupon.describe }}</strong></p>
        <p><strong>折扣力度: 满{{ selectedCoupon.minimumAmount }}减{{ selectedCoupon.discountAmount }}</strong></p>
        <p><strong>有效期: {{ efficientTime }}</strong></p>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSelection">取消</el-button>
        <el-button type="primary" @click="confirmSelection">确定</el-button>
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
import {hasCoupon} from '@/api/user'
import timeUtil from '@/utils/timeUtil'

export default {
  data() {
    return {
      // 用户的优惠卷
      coupons: [],
      selectedCoupon: null, // 存储用户选择的优惠券
      message: '',
      bookDetail: [],
      total: 0,
      bookList: [],
      searchModel: {
        pageNo: 1,
        pageSize: 5
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      couponFormVisible: false,
      formLabelWidth: '100px',
      num: 1,
      // 购买书籍的信息
      buyBookDetail: {},
      // 购买书籍的内容
      buyBookData: {
        num: '',
        id: ''
      }

    }
  },
  mounted() {
    this.getBookList()
  },
  computed: {
    efficientTime() {
      // 判断当前时间是否在活动时间范围内
      const start = timeUtil.formatDate(new Date(this.selectedCoupon.couponStartDate))
      const edd = timeUtil.formatDate(new Date(this.selectedCoupon.couponEddDate))
      return `${start} - ${edd}`
    }
  },
  methods: {
    // 查看优惠卷详情时
    showCouponForm() {
      hasCoupon().then(response => {
        const res = response.data
        if (res != null) {
          this.coupons = response.data
          console.log(this.coupons)
        }
      })
      this.couponFormVisible = true
    },
    closeCouponForm() {
      this.couponFormVisible = false
    },
    cancelSelection() {
      this.selectedCoupon = null
      this.couponFormVisible = false
    },
    confirmSelection() {
      // 处理用户选择的优惠券
      console.log('Selected Coupon:', this.selectedCoupon)
      // 可以根据需要进行进一步的处理，例如提交选择的优惠券给后端进行处理等
      this.closeCouponForm()
    },
    // 购买书籍
    buyBook(id) {
      this.buyBookData.id = id
      this.buyBookData.num = this.num
      this.buyBookData.selectedCoupon = this.selectedCoupon
      bookApi.buyBook(this.buyBookData).then(response => {
        if (response.message === 'success') {
          // eslint-disable-next-line no-unused-vars
          const money = response.data
          messageUtil.success(this, `购买成功,你支付的金额为${money}￥`)
          this.getBookList()
          bookApi.createUserBook(id, this.num).then(response => {
          })
        } else {
          messageUtil.fail(this, response.message)
        }
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
  }
}
</script>

<style scoped>
.inputWith {
  width: 150px;
}

.coupon-container {
  padding: 20px;
}

.coupon-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
