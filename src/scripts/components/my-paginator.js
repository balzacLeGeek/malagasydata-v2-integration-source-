import Vue from 'vue/dist/vue'
import Pagination from 'ant-design-vue/lib/pagination'

Vue.use(Pagination)

export default {
  init() {
    const paginationElement = document.getElementById('table-pagination')
    
    if (!paginationElement) {
      return
    }

    Vue.component('MyPaginator', {
      props: {
        count: {
          type: String,
          required: true,
        },
        current: {
          type: String,
          default: '1',
        },
        limit: {
          type: String,
          default: '10',
        },
      },
      data: function () {
        return {
          total: parseInt(this.count),
          page: parseInt(this.current),
          max: parseInt(this.limit),
        }
      },
      watch: {
        current: {
          immediate: true,
          handler(current) {
            if (typeof current !== 'undefined') {
              this.page = parseInt(current)
            }
          },
        },
        limit: {
          immediate: true,
          handler(limit) {
            if (typeof limit !== 'undefined') {
              this.max = limit
            }
          },
        },
      },
      methods: {
        onChange: function(page) {
          let url = new URL(window.location.href)

          url.searchParams.set('page', page)
          url.searchParams.set('max', this.limit)

          window.location.href = url
        },
        getStart: function() {
          const start = (this.getCount() - (this.max - 1))
          return start > 0 ? start : 1
        },
        getCount: function() {
          const count = (this.page * this.max)

          return (count <= this.total) ? count : this.total
        }
      },
      template: `
        <div v-if="total !== 0">
          <div class="col-md-6 pagination-text" style="padding-top: 5px">Affichage de l'élément {{ getStart() }} à {{ getCount() }} sur {{ total }} {{ getCount() === 1 ? 'élément' : 'éléments' }}</div>
          <div class="col-md-6 pagination-items">
            <a-pagination :total="total" v-model="page" @change="onChange" style="position: relative; float: rigth"/>
          </div>
        </div>
      `,
    })
  },
}
