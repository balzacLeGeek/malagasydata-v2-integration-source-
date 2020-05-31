import Vue from 'vue/dist/vue'

const sidebarElement = document.getElementById('sidebar')

export default {
  init() {
    if (!sidebarElement || !document.getElementById('collapse-btn')) {
      return
    }

    new Vue({
      el: '#sidebar',
      delimiters: ['${', '}'],
      data() {
        return {
          closed: sidebarElement.classList.contains('closed'),
        }
      },
      created() {
        document.addEventListener('click', this.documentClick)
      },
      destroyed() {
        document.removeEventListener('click', this.documentClick)
      },
      methods: {
        documentClick(e) {
          const target = e.target

          if (target.closest('#collapse-btn') === null) {
            return
          }

          this.closed = !this.closed
        },
      },
    })
  },
}
