import Vue from 'vue/dist/vue'
import Button from 'ant-design-vue/lib/button'

import { FragmentPlugin } from '@lib/fragment'
import floatingLabel from '@components/floating-label'
import MyLogin from '@blocks/MyLogin.vue'


Vue.use(Button)
Vue.use(FragmentPlugin)

export default {
  init() {
    console.log('> Login ---')
    floatingLabel.init()

    new Vue({
      el: '#login-container',
      delimiters: ['${', '}'],
      components: {
        MyLogin,
      },
    })
  },
}
