<template>
  <div class="cart">
    <div class="cart-header">购物车</div>
    <div class="cart-body">
      <div class="commodity-caption">
        <div class="fl commodity-caption-info">商品信息</div>
        <div class="fl commodity-caption-price">商品金额</div>
        <div class="fl commodity-caption-count">商品数量</div>
        <div class="fl commodity-caption-amount">总金额</div>
        <div class="fl commodity-caption-edit">编辑</div>
      </div>
      <cart-content
        @showTotalAmount="showTotalAmount"
        @changeAllChosenBtnStatus="changeAllChosenBtnStatus"
        ref="cartContent"
      />
    </div>
    <div class="cart-footer">
      <div class="choose-wrapper">
        <choose-btn :chosen="chosen"/>
        <div @click="allChosen">全选</div>
        <div @click="cancelAllChosen">取消全选</div>
      </div>
      <div class="pay-wrapper">
        <div class="total-text">总额：</div>
        <div class="total-num">{{totalAmount}}元</div>
        <div class="pay">结账</div>
      </div>
    </div>
  </div>
</template>

<script>
import ChooseBtn from '../../base/chooseBtn/chooseBtn'
import CartContent from './cartContent'

export default {
  name: 'Cart',
  data() {
    return {
      totalAmount: '',
      chosen: ''
    }
  },
  methods: {
    // 显示总价
    showTotalAmount(val) {
      this.totalAmount = val
    },
    // 全选
    allChosen() {
      this.chosen = true
      this.$refs.cartContent.allChosen()
    },
    // 取消全选
    cancelAllChosen() {
      this.chosen = false
      this.$refs.cartContent.cancelAllChosen()
    },
    // 改变全选按钮的状态
    changeAllChosenBtnStatus(isAllChosen) {    
      this.chosen = isAllChosen
    }
  },
  components: {
    CartContent,
    ChooseBtn
  }
}
</script>

<style scoped lang="scss">
.cart {
  width: 100%;
  height: 100%;
  background: #fff;

  &-header {
    position: relative;
    height: 120px;
    line-height: 140px;
    color: #333;
    font-size: 24px;
    font-weight: 400;
    text-align: center;

    &::after,
    &::before {
      content: " ";
      position: absolute;
      right: 0;
      top: 60%;
      width: 44%;
      height: 1px;
      background: #979797;
    }

    &::before {
      left: 0;
    }
  }

  &-body {
    margin-bottom: 20px;

    .commodity-caption {
      overflow: hidden;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: #666;
      color: #fff;
      font-size: 16px;

      &-info {
        width: 60%;
        height: 100%;
      }

      &-price,
      &-count,
      &-amount,
      &-edit {
        width: 10%;
        height: 100%;
      }
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    height: 60px;

    .choose-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;

      div {
        margin-left: 25px;
      }
    }

    .pay-wrapper {
      display: flex;
      align-items: center;

      .pay {
        width: 250px;
        height: 100%;
        margin-left: 25px;
        background: #b40c0c;
        color: #fff;
        text-align: center;
        line-height: 60px;
      }

      .total-num {
        min-width: 60px;
        color: #b40c0c;
        font-size: 18px;
      }
    }
  }
}


</style>