<template>
  <div>
    <nav class="col-md-2 d-none d-md-block sidebar-bg sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column sidebar-style">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <span data-feather="home"></span>
              管理控制台
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link" active-class="active">
              <i class="fas fa-shopping-cart"></i>
              商品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orderlist" class="nav-link" active-class="active">
              <i class="fas fa-list"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link" active-class="active">
              <i class="fas fa-ticket-alt"></i>
              優惠券
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>
