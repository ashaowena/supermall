<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{totalPrice}}</div>

    <div class="calculate">
      去计算: ({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => item.checked).reduce((before, next) => {
        return before + next.price * next.count
      },0).toFixed(2)
    },
    checkedLength() {
      return  this.cartList.filter(item => item.checked).reduce((before, next) => {
        return before + next.count
      },0)
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false
      return this.cartList.every(item => item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = false
        })
      } else {
        this.cartList.forEach(item => {
          item.checked = true
        })
      }

    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }
  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;

  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #FFF;
    text-align: center;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }


</style>
