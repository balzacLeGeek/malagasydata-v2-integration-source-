import Vue from 'vue/dist/vue'

export default {
  init() {
    Vue.component('Floating', {
      props: {
        error: {
          type: Boolean,
          default: false,
        },
        success: {
          type: Boolean,
          default: false,
        },
      },

      data: function () {
        return {
          formEl: undefined,
          labelEl: undefined,
          isEmpty: true,
          isActive: false,
          errorClass: this.error,
          successClass: this.success,
        }
      },

      watch: {
        error: {
          immediate: true,
          handler(error) {
            if (typeof error !== 'undefined') {
              this.errorClass = error
            }
          },
        },
        success: {
          immediate: true,
          handler(success) {
            if (typeof success !== 'undefined') {
              this.successClass = success
            }
          },
        },
      },

      computed: {
        classObject: function () {
          return {
            populated: !this.isEmpty,
            focused: this.isActive,
            error: this.error,
            success: this.success,
            'has-message': this.errorClass === true || this.successClass === true
          }
        },
      },

      mounted: function () {
        this.formEl = this.$el.querySelector('input, textarea, select')
        this.labelEl = this.$el.querySelector('label')
        this.formEl.addEventListener('blur', this.updateOnblur)
        this.formEl.addEventListener('focus', this.updateOnFocus)

        this.isEmpty = this.formEl.value.length > 0 ? false : true
      },

      updated: function () {
        if (this.formEl.value) {
          this.isEmpty = this.formEl.value.length > 0 ? false : true
        }
      },

      methods: {
        updateOnFocus: function () {
          this.isActive = true
        },

        updateOnblur: function (e) {
          this.isActive = false
          this.isEmpty = e.target.value.length > 0 ? false : true
        },
      },

      template:
        '<div class="form-group" :class="classObject"><slot></slot></div>',
    })
  },
}
