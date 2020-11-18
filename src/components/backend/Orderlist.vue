<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- 商品列表 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="120">Email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key">
          <td>{{ item.create_at[0] }}-{{ item.create_at[1] }}-{{ item.create_at[2] }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul>
              <li
                style="list-style: none;"
                v-for="(item, key) in item.products"
                :key="key"
              >{{ item.product.title }}{{ item.qty }}{{ item.product.unit }}</li>
            </ul>
          </td>
          <td>{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <Pagination :pagination="pagination" @emitPage="getOrderlist"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/frontend/Alert'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      pagination: {},
      isLoading: false,
      orders: []
    }
  },
  methods: {
    getOrderlist (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.orders = response.data.orders
        vm.orders.forEach((item) => {
          const timestamp = new Date(item.create_at * 1000)
          const timestampValue = [
            timestamp.getFullYear(),
            timestamp.getMonth() + 1,
            timestamp.getDate()
          ]
          item.create_at = timestampValue
        })
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getOrderlist()
  }
}
</script>
