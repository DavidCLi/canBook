<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 封面大圖 -->
    <div class="indexCover">
      <div class="indexTitleBox">
        <h1 class="indexTitle">- 在我推薦的書裡，能提供你去思考 -</h1>
        <p class="indexTitle2">這裡總有一本屬於你的書</p>
        <router-link to="./shop" class="btn btn-primary">開始尋找</router-link>
      </div>
    </div>

    <!-- 精選書籍 -->
    <div class="container">
      <div class="homeTitleFontStyleBox">
        <h2 class="homeTitleFontStyle">精選書籍</h2>
      </div>
      <div class="row mx-5 mb-5" id="featuredBooks">
        <div class="col-4" v-for="(item, key) in featuredBooksProducts.slice(0, 3)" :key="key">
          <div class="p-3 cardBox" @click.prevent="oneProductData(item.id)">
            <img :src="item.imageUrl" alt />
          </div>
          <div class="cardFontStyle">
            <p class="featuredBooksCardTitle">{{ item.title }}</p>
            <span>{{ item.category }}</span>
            <p class="moreFontStyle" @click.prevent="oneProductData(item.id)">
              查看
              <i class="fas fa-angle-double-right"></i>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 優惠驚喜 -->
    <Surprise></Surprise>

    <!-- 輕小說週 -->
    <Ranobe></Ranobe>

    <!-- 最新消息 -->
    <News></News>
    
  </div>
</template>

<script>
import $ from 'jquery';
import Surprise from './Surprise';
import Ranobe from './Ranobe';
import News from './News';

export default {
  components: {
    Surprise,
    Ranobe,
    News,
  },
  data() {
    return {
      featuredBooksProducts: {},
      isLoading: false,
      shopId: "",
      allRanobe: {}
    };
  },
  methods: {
    getFeaturedBooks() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
      vm.isLoading = true;
      vm.$http.get(api).then(response => {
        vm.featuredBooksProducts = response.data.products;
        vm.isLoading = false;
      });
    },
    oneProductData(id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.shopId = id;
      vm.isLoading = false;
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(`shop/${vm.shopId}`);
        }
        vm.isLoading = true;
      });
    },
  },
  created() {
    this.getFeaturedBooks();
  },
};
</script>
