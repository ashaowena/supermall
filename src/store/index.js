import {createStore} from 'vuex'

export default createStore({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payLoad) {
      payLoad.count++
    },
    addCart(state,payLoad) {
      payLoad.checked = true
      state.cartList.push(payLoad)
    }
  },
  actions: {
    addCart(content, payLoad) {
      return new Promise((resolve, reject) => {
        let oldProduct = content.state.cartList.find((item) => {
          return item.iid === payLoad.iid
        });
        if (oldProduct) {
          // oldProduct.count += 1
          content.commit('addCounter', oldProduct)
          resolve('商品增加成功');
        } else {
          payLoad.count = 1
          content.commit('addCart', payLoad)
          resolve('商品添加成功')
        }
      })

    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  modules: {}
})
