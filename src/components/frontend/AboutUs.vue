<template>
  <div class="aboutUsBox">
    <!-- 商店簡介 -->
    <div class="aboutUsImage">
      <div class="aboutUsImageBigBox col-5">
        <div class="aboutUsImageBig col-12"></div>
      </div>
      <div class="aboutUsContentBox col-7">
        <h2 class="aboutUsTitle">關於我們</h2>
        <div class="aboutUsContent container">
          <p
            class="aboutUsContentFontStyle"
          >啃書書店創立於2020年，老闆 林ちゃん 發現年輕文青書籍市場，打算針對此等喜好做市場投資。此書店設計的書衣皆由專門的設計師獨家設計，讓買來想要擺著的文青能夠直覺地想要將他放在房間裡。老闆為了深根此市場，採訪了眾多文青，並將訪談內容寫成著名論文《年輕人的心理-以文青族群為例》，藉以深入此族群的心理，認真地去了解消費者的需要，達到貨出的去，錢進得來的消費循環。</p>
          <p
            class="aboutUsContentFontStyle"
          >客戶要求什麼，我們做什麼! 這是我們的理念。為了維持理念，企業花費大筆資金在員工的創意設計上，將概念提供給他們，同時也教育客戶一個概念。現在全球已有300家分店的啃書書店，將在全球各地為世界上需要我們的顧客獻上我們的服務。現在我們只是300家而已，未來我們的目標是拓展到變成你的鄰居，敬請期待，我的好顧客們~</p>
        </div>
      </div>
    </div>

    <!-- 地圖 -->
    <div class="weAreHere">
      <div class="contactInfo col-5">
        <h2 class="weAreHereTitle">我們在這裡</h2>
        <div class="contactInfoData">
          <div class="contactInfoDataRounds">
            <i class="fas fa-map-signs"></i>
          </div>
          <span>高雄市苓雅區五福一路67號</span>
        </div>
        <div class="contactInfoData">
          <div class="contactInfoDataRounds">
            <i class="fas fa-phone-alt"></i>
          </div>
          <span>0987-878787</span>
        </div>
        <div class="contactInfoData">
          <div class="contactInfoDataRounds">
            <i class="fas fa-envelope"></i>
          </div>
          <span>helloCanBook@gmail.com</span>
        </div>
      </div>
      <div class="OurMap col-7"></div>
    </div>

    <!-- 問題集 -->
    <div class="FAndQ">
      <h2>常見問題</h2>
      <div class="accordion col-12" id="accordionExample">
        <!-- QA1 -->
        <div class="ShoppingQuestionBox">
          <div class="ShoppingQuestion" id="headingOne">
            <div
              class="ShoppingQuestionTitle"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <p class="QuestionTitle">商品出貨方式說明(國內)</p>
              <p class="QuestionOpen">+</p>
            </div>
          </div>

          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div
              class="ShoppingQuestionAnswer"
            >依商品材積重等因素交由不同的配送廠商安排寄送至訂單資料上填寫的收件地址，故請填寫您方便收貨的寄送地址(因包裹需簽收，故請勿填寫郵政信箱)，目前博客來配合的配送廠商有「黑貓宅急便」、「便利帶」、「新竹貨運」。</div>
          </div>
        </div>

        <!-- QA2 -->
        <div class="ShoppingQuestionBox">
          <div class="ShoppingQuestion" id="headingTwo">
            <div
              class="ShoppingQuestionTitle"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <p>超商取貨服務</p>
              <p class="QuestionOpen">+</p>
            </div>
          </div>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div
              class="ShoppingQuestionAnswer"
            >因超商門市空間有限，請注意以下訂單情形。訂購商品數量較多(書本約15-18本)、訂單金額滿20000元以上、單項商品無法選擇「超商取貨」。請您留意，若您超商未取件次數過多，亦無法提供您此服務。</div>
          </div>
        </div>

        <!-- QA3 -->
        <div class="ShoppingQuestionBox">
          <div class="ShoppingQuestion" id="headingThree">
            <div
              class="ShoppingQuestionTitle"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <p>取消訂單</p>
              <p class="QuestionOpen">+</p>
            </div>
          </div>
          <div
            id="collapseThree"
            class="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div
              class="ShoppingQuestionAnswer"
            >目前 CanBook 僅提供整筆訂單或單一商品的全部取消，無法針對數量進行異動。例：會員訂購5本，欲取消2本，由於線上取消的功能無法提供數量異動，因此需請會員與客服人員聯繫處理。</div>
          </div>
        </div>

        <!-- QA4 -->
        <div class="ShoppingQuestionBox">
          <div class="ShoppingQuestion" id="headingFour">
            <div
              class="ShoppingQuestionTitle"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <p>國內處理費用</p>
              <p class="QuestionOpen">+</p>
            </div>
          </div>
          <div
            id="collapseFour"
            class="collapse"
            aria-labelledby="headingFour"
            data-parent="#accordionExample"
          >
            <div class="ShoppingQuestionAnswer">選擇超商取貨，訂單未超過 NT$ 350 需加收處理費 NT$ 20</div>
          </div>
        </div>

        <!-- QA5 -->
        <div class="ShoppingQuestionBox">
          <div class="ShoppingQuestion" id="headingFive">
            <div
              class="ShoppingQuestionTitle"
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              <p class="QuestionTitle">商品出貨說明(海外)</p>
              <p class="QuestionOpen">+</p>
            </div>
          </div>
          <div
            id="collapseFive"
            class="collapse"
            aria-labelledby="headingFive"
            data-parent="#accordionExample"
          >
            <div
              class="ShoppingQuestionAnswer"
            >一般寄送至中國、港澳地區的包裹，CanBook 配合的配送廠商有韻達快遞、DHL、DPEX、Fedex、藍天、中國速遞(EMS)、UCE....等。而寄送至其他地區的包裹，可能使用DHL或郵局快捷(EMS)。</div>
          </div>
        </div>

        <!-- QA6 -->
        <div class="ShoppingQuestionBox">
          <div class="ShoppingQuestion" id="headingSix">
            <div
              class="ShoppingQuestionTitle"
              data-toggle="collapse"
              data-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              <p class="QuestionTitle">商品已經寄出了，是否還能變更寄送地址？</p>
              <p class="QuestionOpen">+</p>
            </div>
          </div>
          <div
            id="collapseSix"
            class="collapse"
            aria-labelledby="headingSix"
            data-parent="#accordionExample"
          >
            <div
              class="ShoppingQuestionAnswer"
            >商品出貨後，即無法修改寄送地址、收件人等資料。若您原本的地址無法成功投遞，包裹將會被退回博客來，並以e-mail方式通知會員。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
