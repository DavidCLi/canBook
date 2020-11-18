<template>
  <div class="container">
    <div class="row">
      <h2 class="col-12 ranobeTitle">- 嶄新的青春群像小說，故事邁向最終章 -</h2>
      <div class="row mx-5 mb-5">
        <div class="col-4 ranobeBox" v-for="(item, key) in allRanobe.slice(-4, -1)" :key="key">
          <div class="p-3 cardBox" @click.prevent="oneProductData(item.id)">
            <img :src="item.imageUrl" alt />
          </div>
          <div class="cardFontStyle">
            <strong>{{ item.title }}</strong>
            <span>{{ item.category }}</span>
            <p class="moreFontStyle" @click.prevent="oneProductData(item.id)">
              查看
              <i class="fas fa-angle-double-right"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      shopId: "",
      allRanobe: {}
    };
  },
  methods: {
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
    getAllRanobe() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        const totalBooks = response.data.products;
        vm.allRanobe = totalBooks.filter(item => item.category === "輕小說");
      });
    }
  },
  created() {
    this.getAllRanobe();
  }
};
</script>