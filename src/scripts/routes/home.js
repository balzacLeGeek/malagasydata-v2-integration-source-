import Vue from 'vue/dist/vue'

import IndexComponent from '@blocks/IndexComponent.vue'

export default {
  init() {
    new Vue({
      el: '#home-wrapper',
      delimiters: ['${', '}'],
      components: {
        home: IndexComponent,
      },
      mounted() {
        console.log('Home page')
      },
    })
  },
}
