<template>
  <div>
    <Alert></Alert>
    <nav class="container">
      <div class="l-nav-table">
        <router-link to="/" class="l-logo">
          <img src="../../assets/image/logo2.png" alt />
        </router-link>
        <ul class="l-nav-mainOption">
          <li>
            <router-link to="/shop">優秀好書</router-link>
          </li>
          <li>
            <router-link to="/aboutUs">關於我們</router-link>
          </li>
          <li class="l-nav-user">
            <router-link to="/login">
              <i class="fas fa-user"></i>
            </router-link>
          </li>
        </ul>

        <!-- phone mode -->
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link to="/shop">優秀好書</router-link>
            <router-link to="/aboutUs">關於我們</router-link>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <div class="l-footer-table">
        <div class="l-logo2">
          <router-link to="/">
            <img src="../../assets/image/logo2.png" alt />
          </router-link>
        </div>
        <ul class="l-footer-icon">
          <li>
            <a href="https://fb.me" alt="Facebook 粉絲專頁">
              <i class="fab fa-facebook-square"></i>
            </a>
          </li>
          <li>
            <a href="https://line.me/zh-hant/" alt="LINE 官方帳號">
              <i class="fab fa-line"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/?hl=zh-tw" alt="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/home?lang=zh-tw" alt="Twitter">
              <i class="fab fa-twitter-square"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from 'jquery'
import Alert from './Alert'

export default {
  components: {
    Alert
  },
  created () {
    $(window).scroll(() => {
      if ($('html, body').scrollTop() >= 230) {
        $('.l-nav-table')
          .hide()
          .stop()
      } else {
        $('.l-nav-table')
          .show()
          .stop()
      }
    })
  }
}
</script>
