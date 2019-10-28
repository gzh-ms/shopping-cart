<template>
  <div class="content" v-if="cartList.length">
    <div class="commodity-item" v-for="(item, index) in cartList" :key="index">
      <div class="commodity-info">
        <div class="choose-wrapper">
          <choose-btn
            :chosen="item.chosen"
            @changeChosenStatus="changeChosenStatus(index)"
          />
        </div>
        <a href="###" class="commodity-link">
          <img :src="item.imgSrc" alt="img" class="commodity-pic" />
        </a>
        <div class="commodity-desc">
          <a href="###">
            <p class="commodity-name">{{item.name}}</p>
          </a>
          <div class="present-wrapper">
            <p>赠送:</p>
            <div class="present">
              <p
                class="present-item"
                v-for="presentItem in item.present"
                :key="presentItem"
              >{{presentItem}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="commodity-price">
        <div>
          ￥
          <span>{{item.price.toFixed(2)}}</span>
        </div>
      </div>
      <div class="commodity-count">
        <div>
          <span @click="minus(index)">-</span>
          <input type="text" v-model="item.count" />
          <span @click="add(index)">+</span>
        </div>
        <p>{{item.cargo}}</p>
      </div>
      <div class="commodity-totalPrice">
        ￥
        <span>{{(item.count * item.price).toFixed(2)}}</span>元
      </div>
      <div class="commodity-del">
        <span @click="delCommodity(index)">X</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ChooseBtn from '../../base/chooseBtn/chooseBtn'

export default {
  name: "CartContent",
  data() {
    return {
      cartList: []
    }
  },
  methods: {
    // api--父组件调用，全选
    allChosen() {
      this.cartList.forEach((item, index) => this.cartList[index].chosen = true)
    },
    // 取消全选
    cancelAllChosen() {
      this.cartList.forEach((item, index) => this.cartList[index].chosen = false)
    },

    // 初始化
    init() {
      // 显示总价
        this.$emit('showTotalAmount', this.totalAmount)

        // 改变父组件全选按钮的状态    
        this.$emit('changeAllChosenBtnStatus', this.isAllChosen) 
    },
    // 增加数量
    add(index) {
      this.cartList[index].count++
    },
    // 减少数量
    minus(index) {
      let { count } = this.cartList[index]

      // 数量等于1时 直接返回
      if (--count < 1) return

      this.cartList[index].count = count   
    },
    // 改变选择的状态
    changeChosenStatus(index) {
      const { cartList } = this      

      cartList.forEach((item, idx) => {
        if (index === idx) {
          this.cartList[idx].chosen = !item.chosen

          // 改变父组件全选按钮的状态
          this.$emit('changeAllChosenBtnStatus', this.isAllChosen)
        }
      })     
    },
    // 删除商品
    delCommodity(index) {
      this.cartList.splice(index, 1)
    }
  },
  computed: {
    // 根据选择的产品计算总价
    totalAmount(val) {
      let _totalAmount = 0

      val.cartList.forEach(item => {
        if (item.chosen) {
          _totalAmount += item.count * item.price
        }
      })

      return _totalAmount
    },
    // 根据产品选择的状态计算是否已经全选
    isAllChosen(val) {
      return val.cartList.every(item => item.chosen === true)
    }
  },
  watch: {
    totalAmount() {
      // 显示总价
      this.$emit('showTotalAmount', this.totalAmount)
    }
  },
  mounted() {
    axios.get('http://192.168.1.104:8080/cart.json').then(res => {
      const { data } = res;

      if (data.length) {
        this.cartList = data

        this.init()
      } else {
        throw new Error('没有获取到数据')
      }
    }).catch(e => {
      if (e) {
        console.log(e)
        // 使用本地数据
        import(
          './config'
          /* webpackPrefetch: true */
          /* webpackChunkName: "cartList" */
        ).then(data => {
          this.cartList = data.default

          this.init()
        })
      }
    })
  },
  components: {
    ChooseBtn
  }
};
</script>

<style scoped lang="scss">
.commodity-item {
  display: flex;
  padding: 30px 0;
  border-bottom: 1px solid #ddd;

  .commodity-info {
    display: flex;
    width: 60%;
    padding-left: 20px;
    box-sizing: border-box;

    .choose-wrapper {
      display: flex;
      
      .choose {
        margin-top: 30px;
      }
    }

    .commodity-link {
      display: block;
      margin-left: 25px;

      .commodity-pic {
        display: block;
        width: 75px;
        height: 75px;
      }
    }

    .commodity-desc {
      flex: 1;
      margin-left: 25px;
      font-size: 14px;

      .commodity-name {
        margin-bottom: 40px;
      }

      .present-wrapper {
        display: flex;

        .present {
          margin-left: 20px;

          &-item {
            color: #ddd;
            margin-bottom: 8px;
          }
        }
      }
    }
  }

  .commodity-price,
  .commodity-count,
  .commodity-totalPrice,
  .commodity-del {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
  }

  .commodity-count {
    flex-direction: column;
    font-size: 14px;
    color: #979797;
    
    input {
      width: 36px;
      padding: 4px 0 4px 11px;
      margin: 0 4px 6px;
      box-sizing: border-box;
      outline: none;
      color: #666;
    }

    span {
      padding: 5px;
      cursor: pointer;
    }
  }

  .commodity-totalPrice {
    color: #f01414;
  }

  .commodity-del {
    cursor: pointer;

    span {
      padding: 20px;
    }
  }
}
</style>