<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 卡片 -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="(item, key) in cardProducts" :key="key">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="item.price === item.origin_price">售價 {{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price !== item.origin_price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price !== item.origin_price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click.prevent="seeMore(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="item.id === productId"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click.prevent="addToShippingCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="item.id === productId"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分頁 -->
    <Pagination :pagination="pagination" @emitPage="getCustomerOrder"></Pagination>

    <!-- 產品 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              style="height: 100vh; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${ product.imageUrl })`}"
            ></div>
            <p class="card-text">{{ product.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                class="h5"
                v-if="product.price === product.origin_price"
              >售價 {{ product.origin_price }} 元</div>
              <del
                class="h6"
                v-if="product.price !== product.origin_price"
              >原價 {{ product.origin_price }} 元</del>
              <div
                class="h5"
                v-if="product.price !== product.origin_price"
              >現在只要 {{ product.price }} 元</div>
            </div>
            <select class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <span>{{ product.num * product.price }}</span> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="addToShippingCart(product.id, product.num)"
            >加入購物車</button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 mx-auto">
      <!-- 購物車 -->
      <table class="table mt-5">
        <thead>
          <th width="40"></th>
          <th>品名</th>
          <th width="120">數量</th>
          <th width="100">單價</th>
        </thead>
        <tbody>
          <tr v-for="(item, key) in shippingCart.carts" :key="key">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click.prevent="delShippingCartProduct(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ Math.round(item.final_total) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ shippingCart.total }}</td>
          </tr>
          <tr v-if="shippingCart.total !== shippingCart.final_total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ Math.round(shippingCart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>

      <!-- 優惠券 -->
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click.prevent="useCoupon">套用優惠碼</button>
        </div>
      </div>

      <!-- 個人資料 -->
      <div class="my-5 row justify-content-center">
        <form class="col-md" @submit.prevent="sendOrder">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-model="form.user.email"
              v-validate="'required|email'"
              placeholder="請輸入 Email"
              :class="{'is-invalid': errors.has('email')}"
            />
            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              v-model="form.user.name"
              placeholder="輸入姓名"
              v-validate="'required'"
              :class="{'is-invalid ': errors.has('name')}"
            />
            <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
          </div>

          <div class="form-group">
            <label for="usertel">收件人手機</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              name="tel"
              placeholder="請輸入手機"
              v-model="form.user.tel"
              v-validate="'phone'"
              :class="{'is-invalid': errors.has('tel')}"
            />
            <span class="text-danger" v-if="errors.has('tel')">{{ '手機' + errors.first('tel') }}</span>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              placeholder="請輸入地址"
              v-validate="'required'"
              :class="{'is-invalid': errors.has('address')}"
            />
            <span class="text-danger" v-if="errors.has('address')">請輸入收件人地址</span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '../frontend/Pagination'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      pagination: {},
      isLoading: false,
      cardProducts: [],
      product: {},
      productId: '',
      shippingCart: {
        carts: {}
      },
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCustomerOrder (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.cardProducts = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    seeMore (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.productId = id
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          response.data.product.num = 1
          vm.product = response.data.product
          $('#productModal').modal('show')
          vm.productId = ''
        }
      })
    },
    addToShippingCart (id, num = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const shippingCart = {
        product_id: id,
        qty: num
      }
      vm.$http.post(api, { data: shippingCart }).then(() => {
        vm.getShippingCart()
        $('#productModal').modal('hide')
      })
    },
    getShippingCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.shippingCart = response.data.data
      })
    },
    delShippingCartProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.getShippingCart()
        }
      })
    },
    useCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.isLoading = true
      const coupon = {
        code: vm.coupon_code
      }
      vm.$http.post(api, { data: coupon }).then(() => {
        vm.getShippingCart()
        vm.isLoading = false
      })
    },
    sendOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.isLoading = true
      vm.$validator.validate().then((result) => {
        if (result) {
          vm.$http.post(api, { data: order }).then((response) => {
            if (response.data.success) {
              vm.$router.push(`customerorder_check/${response.data.orderId}`)
            }
            vm.isLoading = false
          })
        } else {
          vm.isLoading = false
        }
      })
    }
  },
  created () {
    this.getCustomerOrder()
    this.getShippingCart()
  }
}
</script>
