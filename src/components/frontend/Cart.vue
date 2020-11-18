<template>
  <div class="container">
    <div class="row shopPaddingTop">
      <div class="scheduleShow col-8">
        <ul>
          <li>
            <p>1.填寫訂購資料</p>
          </li>
          <li>
            <p>2.付款確認</p>
          </li>
          <li>
            <p>3.完成訂單</p>
          </li>
        </ul>
      </div>

      <div class="col-12 cartData">
        <!-- 訂單資訊 -->
        <div class="orderData col-8">
          <p class="orderTitle">訂單資訊</p>
          <form @submit.prevent="sendOrder">
            <div class="form-group">
              <label for="useremail">
                Email
                <span>*必填</span>
              </label>
              <input
                type="email"
                v-model="form.user.email"
                class="form-control"
                name="email"
                id="useremail"
                placeholder="請輸入 Email"
                v-validate="'required|email'"
                :class="{'is-invalid': errors.has('email')}"
              />
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>

            <div class="form-group">
              <label for="username">
                收件人姓名
                <span>*必填</span>
              </label>
              <input
                type="text"
                v-model="form.user.name"
                :class="{'is-invalid ': errors.has('name')}"
                class="form-control"
                name="name"
                v-validate="'required'"
                id="username"
                placeholder="請輸入姓名"
              />
              <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
            </div>

            <div class="form-group">
              <label for="username">
                收件人手機
                <span>*必填</span>
              </label>
              <input
                type="text"
                v-model="form.user.tel"
                :class="{'is-invalid': errors.has('tel')}"
                class="form-control"
                name="tel"
                v-validate="'phone'"
                id="usertel"
                placeholder="請輸入手機"
              />
              <span class="text-danger" v-if="errors.has('tel')">{{ '手機' + errors.first('tel') }}</span>
            </div>

            <div class="form-group">
              <label for="username">
                收件人地址
                <span>*必填</span>
              </label>
              <input
                type="text"
                v-model="form.user.address"
                :class="{'is-invalid': errors.has('address')}"
                class="form-control"
                name="address"
                v-validate="'required'"
                id="useraddress"
                placeholder="請輸入地址"
              />
              <span class="text-danger" v-if="errors.has('address')">請輸入收件人地址</span>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name
                v-model="form.message"
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div class="text-right">
              <button class="btn btn-primary">送出訂單</button>
            </div>
          </form>
        </div>

        <!-- 購物車內容 -->
        <div class="shoppingCartList col-4">
          <div class="shoppingCartListTitle">
            <strong>購物車清單</strong>
            <div
              class="countRound"
              v-if="totalShoppingList.carts.length !== 0"
            >{{ totalShoppingList.carts.length }}</div>
            <div class="countRound" v-if="totalShoppingList.carts.length === 0">0</div>
            <button
              type="button"
              class="btn btn-prompt"
              @click.prevent="delAllShoppingCartList"
            >清空購物車</button>
          </div>
          <div class="lumpSum" v-if="totalShoppingList.total === totalShoppingList.final_total">
            <strong>小計</strong>
            <span>NT: {{ totalShoppingList.total }}</span>
          </div>
          <div class="lumpSum" v-if="totalShoppingList.total !== totalShoppingList.final_total">
            <strong>折扣後小計</strong>
            <span>NT: {{ Math.round(totalShoppingList.final_total) }}</span>
          </div>
          <div
            class="shoppingCartContent"
            v-for="(item, key) in totalShoppingList.carts"
            :key="key"
          >
            <button
              type="button"
              class="btn btn-prompt"
              @click.prevent="delShopingCartList(item.id, key)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
            <div class="w-60">
              <p>{{ item.product.title }}</p>
              <p>數量: {{ item.qty }}</p>
            </div>
            <span>NT$: {{ item.product.price * item.qty }}</span>
          </div>
          <div class="enterCoupon">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入優惠碼"
              name="coupon"
              v-model="coupon_code"
            />
            <div class="input-group-append" @click.prevent="useCoupon">
              <button class="btn" type="button" id="button-addon2">送出</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      isLoading: false,
      totalShoppingList: {
        carts: {}
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cartId: '',
      coupon_code: ''
    }
  },
  methods: {
    getShoppingCartList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.totalShoppingList = response.data.data;
        vm.isLoading = false;
      })
    },
    sendOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.$validator.validate().then((result) => {
        if (result) {
          if (vm.totalShoppingList.carts.length >= 1) {
            vm.$http.post(api, { data: order }).then((response) => {
              if (response.data.success) {
                vm.cartId = response.data.orderId
                vm.$router.push(`cart/${vm.cartId}`)
              }
            })
          } else {
            vm.$bus.$emit(
              'message:push',
              '購物車沒有商品喔 快去商店看看吧~',
              'primary'
            )
          }
        }
      })
    },
    delShopingCartList (id, key) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then((response) => {
        vm.getShoppingCartList()
        vm.totalShoppingList.carts.splice(key, 1);
        sessionStorage.setItem(
          "cart",
          JSON.stringify(vm.totalShoppingList.carts)
        );
        vm.isLoading = false
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    delAllShoppingCartList () {
      const vm = this
      const getAllID = vm.totalShoppingList.carts
      // 刪除 sessionStorage
      vm.totalShoppingList.carts = [];
      sessionStorage.setItem('cart', JSON.stringify(vm.totalShoppingList.carts));
      // 刪除 Ajax 資料
      const itisID = []
      vm.isLoading = true
      getAllID.forEach((item) => {
        itisID.push(item.id)
      })
      const apiary = []
      itisID.forEach((id) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
        apiary.push(vm.$http.delete(api).then())
      })
      Promise.all(apiary).then(() => {
        vm.isLoading = false
        vm.getShoppingCartList()
        if (vm.isLoading === false) {
          vm.$bus.$emit('message:push', '已全部刪除', 'danger')
        }
      })
    },
    useCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$http.post(api, { data: coupon }).then()
    },
    delReCart(goNext) {
      const vm = this;
      vm.isLoading = true;
      // 刪除重複的 item 後才前進到下一頁
      vm.$http.all(
        vm.totalShoppingList.carts.map((item) => {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
          return vm.$http.delete(api);
        })
      ).then(() => {
        vm.isLoading = false;
        goNext();
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.delReCart(next);
  },
  created () {
    $('body').css('overflow-y', '')
    this.getShoppingCartList()
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 640px) {
  .backShop {
    display: none;
  }
}

@media (min-width: 641px) and (max-width: 960px) {
  .backShop {
    display: none;
  }
}
</style>
