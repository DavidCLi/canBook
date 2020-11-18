<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row shopPaddingTop">
      <!-- booksClassification -->
      <div class="classificationAndCart">
        <div class="booksClassification">
          <strong>書籍類別</strong>
          <select class="classificationStyle" v-model="classification" @click.prevent="bookFilter">
            <option value="全部好書" class="classificationStyle">全部好書</option>
            <option
              :value="item"
              class="classificationStyle"
              v-for="(item, key) in allCategoryFilter"
              :key="key"
            >{{ item }}</option>
          </select>
          <i class="fas fa-caret-down classificationIcon"></i>
        </div>
      </div>

      <!-- content -->
      <div class="totalBooks">
        <div class="totalBooksTitle">{{ classification }}</div>
        <div class="col-4 totalBooksCard" v-for="(item, key) in totalBooks" :key="key" id="aBook">
          <div class="cardBox" @click.prevent="seeMore(item.id)">
            <img :src="item.imageUrl" alt />
          </div>
          <div class="totalBooksCardFontStyle">
            <strong>{{ item.title }}</strong>
            <span>NT$: {{ item.price }}</span>
          </div>
        </div>
        <Pagination :pagination="pagination" @emitPage="getShop" v-if="classification === '全部好書'"></Pagination>
      </div>
    </div>
    <div class="shoppingCartIcon" @click="sideBarOpen">
      <i class="fas fa-shopping-cart"></i>
      <div
        class="shoppingCartQty"
        v-if="totalShoppingList.carts.length > 0"
      >{{ totalShoppingList.carts.length }}</div>
    </div>
    <div class="shoppingSideBar" v-if="totalShoppingList.carts.length > 0">
      <div class="shoppingSideBarTitle">
        <span>購物車內容</span>
        <i class="fas fa-times" @click="sideBarClose"></i>
      </div>
      <div class="shoppingSideBarContent">
        <div v-for="(item, key) in totalShoppingList.carts" :key="key" class="shoppingSideBarList">
          <span class="shoppingSideBarDataDel" @click.prevent="delShoppingCartList(key)">X</span>
          <img :src="item.product.imageUrl" alt />
          <div class="shoppingSideBarData">
            <p>{{ item.product.title }}</p>
            <span>{{ item.qty }}/{{ item.product.unit }}</span>
            <span>NT{{ (item.product.price * item.qty) | currency }}</span>
          </div>
        </div>
        <div class="shoppingSideBarTotal">
          <p>小計: NT{{ total | currency }}</p>
          <button class="delAllBtn" @click.prevent="delAllShoppingCartList">清除購物車</button>
        </div>
      </div>
      <button class="shoppingSideBarGetOrderBtn btn" @click.prevent="postCart">
        下單去
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
    <div class="shoppingSideBar" v-else>
      <div class="shoppingSideBarTitle">
        <span>購物車內容</span>
        <i class="fas fa-times" @click="sideBarClose"></i>
      </div>
      <div class="shoppingSideBarZero">購物車目前是空的! 快去商場逛逛吧~</div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      totalBooks: [],
      totalBooksAll: [],
      pagination: {},
      isLoading: false,
      shopId: "",
      totalShoppingList: {
        carts: {}
      },
      coupon_code: "",
      classification: "全部好書",
      allCategory: [],
      allCategoryFilter: []
    };
  },
  computed: {
    total() {
      sessionStorage.setItem(
        "cart",
        JSON.stringify(this.totalShoppingList.carts)
      );
      return this.totalShoppingList.carts.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
      );
    }
  },
  methods: {
    getShop(page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.$http.get(api).then(response => {
        vm.totalBooks = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getAllShop() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        vm.totalBooksAll = response.data;
        const allProduct = response.data.products;
        vm.allCategory = allProduct.map(item => item.category);
        vm.allCategoryFilter = vm.allCategory.filter(
          (item, number, arr) => arr.indexOf(item) === number
        );
      });
    },
    seeMore(id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.shopId = id;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(`shop/${vm.shopId}`);
        }
        vm.isLoading = false;
      });
    },
    ShoppingCartList() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.totalShoppingList.carts =
        JSON.parse(sessionStorage.getItem("cart")) || [];
    },
    delShoppingCartList(key) {
      const vm = this;
      vm.isLoading = true;
      vm.totalShoppingList.carts.splice(key, 1);
      sessionStorage.setItem(
        "cart",
        JSON.stringify(vm.totalShoppingList.carts)
      );
      vm.isLoading = false;
      vm.$bus.$emit("message:push", "刪除成功", "danger");
    },
    useCoupon() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.$http.post(api, { data: coupon }).then();
    },
    bookFilter() {
      const vm = this;
      if (vm.classification === "全部好書") {
        vm.getShop();
      } else {
        const allProduct = vm.totalBooksAll.products;
        vm.totalBooks = allProduct.filter(
          item => vm.classification === item.category
        );
      }
    },
    delAllShoppingCartList() {
      this.totalShoppingList.carts = [];
      sessionStorage.setItem(
        "cart",
        JSON.stringify(this.totalShoppingList.carts)
      );
    },
    postCart() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http
        .all(
          vm.totalShoppingList.carts.map(item => {
            const cartItem = {
              product_id: item.product.id,
              qty: item.qty
            };
            return vm.$http.post(api, { data: cartItem });
          })
        )
        .then(() => {
          vm.isLoading = false;
          vm.$router.push("/cart");
        });
    },
    sideBarOpen() {
      $(".shoppingSideBar")
        .css({ display: "inline-block" })
        .animate({ right: "0%" }, 100);
      $("body").css("overflow-y", "hidden");
    },
    sideBarClose() {
      $(".shoppingSideBar").css({ display: "none" });
      $("body").css("overflow-y", "");
    }
  },
  created() {
    this.getShop();
    this.ShoppingCartList();
    this.getAllShop();
  }
};
</script>
