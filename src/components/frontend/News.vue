<template>
  <div class="bg-primary">
    <div class="container">
      <div class="row">
        <div class="col-12 newsTitle">最新消息</div>
        <div class="col-4 activityNews">
          <div class="activityFontStyle1 activityImage1 equalHeightActivityImage">
            <strong>【我想你會喜歡的私小說】</strong>
            <p>03/05全新上市</p>
            <span>日本大文豪夏目漱石及太宰治最新授權翻譯版本 日台文壇各領域一致贊同!</span>
          </div>
          <p class="popularity">二月&nbsp;28,&nbsp;人氣(996487)</p>
        </div>
        <div class="col-4 activityNews">
          <div class="activityFontStyle2 activityImage2 equalHeightActivityImage">
            <strong>【現代的神秘-天文學】</strong>
            <p>09/22在某處的星空下</p>
            <span>別慌!這是最完整有趣的宇宙導覽手冊</span>
          </div>
          <p class="popularity">八月&nbsp;31,&nbsp;人氣(868400)</p>
        </div>
        <div class="col-4 activityNews">
          <div class="activityFontStyle3 activityImage3 equalHeightActivityImage">
            <strong>【世紀偵探-夏洛克福爾摩斯】</strong>
            <p>11/09揭發真相</p>
            <span>我的朋友 這很簡單!!</span>
          </div>
          <p class="popularity">十月&nbsp;28,&nbsp;人氣(883695)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  created() {
    $(function() {
      let h = 0;
      $('.equalHeightActivityImage').each(function() {
        if($(this).height() > h) {
          h = $(this).height();
        }
      })
      $('.equalHeightActivityImage').css('height', h + 'px');
    })
  }
};
</script>
