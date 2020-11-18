<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="openCouponModal(true)">建立新的優惠券</button>
    </div>

    <!-- 商品列表 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th>優惠碼</th>
          <th>到期日</th>
          <th>折扣百分比</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.due_date }}</td>
          <td>{{ item.percent }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-info btn-sm"
              @click.prevent="openCouponModal(false, item)"
            >編輯</button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click.prevent="openDelCouponModal(item)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <Pagination :pagination="pagination" @emitPage="getCoupons"></Pagination>

    <!-- 新增/編輯 -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempCoupon.title"
                  />
                </div>
                <div class="form-group">
                  <label for="coupon">優惠碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="coupon"
                    placeholder="請輸入優惠碼"
                    v-model="tempCoupon.code"
                  />
                </div>
                <div class="form-group">
                  <label for="dueDate">到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="dueDate"
                    placeholder="請輸入到期日"
                    v-model="tempCoupon.due_date"
                  />
                </div>
                <div class="form-group">
                  <label for="percent">折扣百分比</label>
                  <input
                    type="text"
                    class="form-control"
                    id="percent"
                    placeholder="請輸入折扣百分比"
                    v-model="tempCoupon.percent"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updataCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除 -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/frontend/Alert'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      coupons: {},
      tempCoupon: {},
      isNew: false,
      pagination: {}
    }
  },
  methods: {
    getCoupons () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
        $('#couponModal').modal('show')
      } else {
        this.tempCoupon = { ...item }
        this.isNew = false
        $('#couponModal').modal('show')
      }
    },
    updataCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      if (vm.isNew === false) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        }
      })
    },
    openDelCouponModal (item) {
      this.tempCoupon = item
      $('#delCouponModal').modal('show')
    },
    delCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        }
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
