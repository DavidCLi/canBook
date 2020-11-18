<template>
  <div class="container">
    <div class="row shopPaddingTop">
      <div class="scheduleShowCheck col-12">
        <ul>
          <li>
            <p>1.填寫訂購資料</p>
          </li>
          <li :class="{'scheduleShowAnother': orderData.is_paid == 1}">
            <p>2.付款確認</p>
          </li>
          <li v-if="orderData.is_paid == 0">
            <p>3.完成訂單</p>
          </li>
          <li v-else id="successOrder">
            <p>3.完成訂單</p>
          </li>
        </ul>
      </div>

      <form action class="col-12">
        <div>
          <!-- 購買列表 -->
          <div class="CheckStyle">
            <p class="CheckTableTitle">購買列表</p>
            <table class="col-8">
              <thead class="CheckHeadStyle">
                <tr>
                  <td width="70%">商品名稱</td>
                  <td width="15%">數量</td>
                  <td width="15%">價格</td>
                </tr>
              </thead>
              <tbody class="CheckBodyStyle">
                <tr v-for="(item, key) in orderData.products" :key="key">
                  <td width="70%">{{ item.product.title }}</td>
                  <td width="15%">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td width="15%">{{ item.product.price }}元</td>
                </tr>
              </tbody>
            </table>
            <p class="CheckTotal col-8">
              總計
              <strong>NT$ {{ orderData.total }}</strong>
            </p>
          </div>

          <hr class="col-6" />

          <!-- 個人資訊 -->
          <div class="CheckStyle">
            <p class="CheckTableTitle">個人資訊</p>
            <table class="col-8">
              <thead class="CheckHeadStyle">
                <tr>
                  <td>項目</td>
                  <td>訂購人資訊</td>
                </tr>
              </thead>
              <tbody class="CheckBodyStyle">
                <tr>
                  <td>姓名</td>
                  <td>{{ orderData.user.name }}</td>
                </tr>
                <tr>
                  <td>電話</td>
                  <td>{{ orderData.user.tel }}</td>
                </tr>
                <tr>
                  <td>電子信箱</td>
                  <td>{{ orderData.user.email }}</td>
                </tr>
                <tr>
                  <td>地址</td>
                  <td>{{ orderData.user.address }}</td>
                </tr>
                <tr>
                  <td>付款狀態</td>
                  <td v-if="orderData.is_paid == 0" class="text-danger">尚未付款</td>
                  <td v-else class="text-success">付款成功</td>
                </tr>
              </tbody>
            </table>
            <div
              class="text-right col-8 CheckBtn"
              v-if="orderData.is_paid == 0"
              @click="OkeyIWantPaid"
            >
              <button class="btn btn-primary">確認付款去</button>
            </div>
            <div class="text-right col-8 CheckBtn" v-if="orderData.is_paid == 1">
              <router-link to="/" class="btn btn-primary">繼續購物</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartId: '',
      orderData: {}
    }
  },
  methods: {
    getOneCartData () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.cartId}`
      vm.$http.get(api).then((response) => {
        vm.orderData = response.data.order
      })
    },
    OkeyIWantPaid () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.cartId}`
      vm.$http.post(api).then(() => {
        vm.getOneCartData()
      })
    }
  },
  created () {
    this.cartId = this.$route.params.cartId
    this.getOneCartData()
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
