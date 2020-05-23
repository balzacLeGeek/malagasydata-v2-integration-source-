import Vue from 'vue/dist/vue'

export default {
  init() {
    Vue.component('CInputNumber', {
      props: {
        error: {
          type: Boolean,
          default: false,
        },

        min: {
          type: Number,
          default: 0,
        },

        max: {
          type: Number,
          default: 100,
        },
      },

      data: function () {
        return {
          formEl: undefined,
          plusEl: undefined,
          minusEl: undefined,
          subEl: undefined,
          supEl: undefined,
          subVal: '',
          supVal: '',
          // currentVal: parseInt(this.formEl.value),

          isEmpty: true,
          isActive: false,
        }
      },

      computed: {},

      mounted: function () {
        // initialise elements
        this.formEl = this.$el.querySelector('.input-number')
        this.plusEl = this.$el.querySelector('.cin_plus')
        this.minusEl = this.$el.querySelector('.cin_minus')
        this.subEl = this.$el.querySelector('.cin_sub')
        this.supEl = this.$el.querySelector('.cin_sup')

        // initialise events
        this.formEl.addEventListener('change', this.changeVal)
        this.plusEl.addEventListener('click', this.increaseVal)
        this.minusEl.addEventListener('click', this.decreaseVal)

        this.changeVal()
      },

      methods: {
        increaseVal: function () {
          if (parseInt(this.formEl.value) < this.max) {
            this.formEl.value = parseInt(this.formEl.value) + 1
          }
          this.changeVal()
        },
        decreaseVal: function () {
          if (parseInt(this.formEl.value) > this.min) {
            this.formEl.value = parseInt(this.formEl.value) - 1
          }
          this.changeVal()
        },
        changeVal: function () {
          console.log(this.min, this.max)

          this.subVal = parseInt(this.formEl.value) - 1
          if (this.subVal < this.min) {
            this.subVal = ''
          }

          this.supVal = parseInt(this.formEl.value) + 1
          if (this.supVal > this.max) {
            this.supVal = ''
          }
        },
      },

      template:
        '<div class="c-input-number">' +
        '<a class="cin_minus"><i class="dicon dicon-chevron-left"></i></a>' +
        '<div class="cin_input-wrapper">' +
        '<span class="cin_sub">{{ subVal }}</span>' +
        '<slot></slot>' +
        '<span class="cin_sup">{{ supVal }}</span>' +
        '</div>' +
        '<a class="cin_plus"><i class="dicon dicon-chevron-right"></i></a>' +
        '</div>',
    })
  },
}
