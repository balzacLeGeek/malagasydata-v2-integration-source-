import Vue from 'vue/dist/vue'
import floatingLabel from '@components/floating-label'
import { RESPONSE } from '@constants/'

export default {
  init() {
    console.log('> Login ---')
    floatingLabel.init()

    new Vue({
      el: '#login-container',
      delimiters: ['${', '}'],
      props: {
        forgetpwd: {
          type: Boolean,
          default: false,
        },
      },
      data: function() {
        return {
          loading: false,
          email: null,
          password: null,
          errors: [],
          emailerror: false,
          pwderror: false,
          loginMessage: '',
          submitError: false,
        };
      },
      mounted() {
        this.loader()
      },
      methods: {
        loader: function () {
          setTimeout(() => {
            this.loading = false
          }, 1000)
        },
        validateForm: function (event) {
          event.preventDefault() // prevent to submit formc

          this.errors = []

          if (!this.email) {
            this.errors.push('Email requis.')
            this.emailerror = true
          } else if (!this.validateEmail(this.email)) {
            this.errors.push('Adresse email non valide')
            this.emailerror = true
          }

          if (!this.password && !this.$el.dataset.forgetpwd) {
            this.errors.push('Mot de passe requis')
            this.pwderror = true
          }

          if (!this.errors.length) {
            this.submitForm()
          }
        },

        validateEmail: function (email) {
          const testPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          return testPattern.test(email)
        },

        submitForm: async function () {
          let data = {}

          if (this.$el.dataset.forgetpwd) {
            data = {
              email: this.email,
            }
          } else {
            data = {
              email: this.email,
              password: this.password,
            }
          }

          this.submitError = false

          try {
            const response = await Login(data)

            if (response.status === RESPONSE.HTTP_OK) {
              if (response.data.token) {
                localStorage.setItem('token', response.data.token)
              }

              location.reload()
            } else {
              this.submitError = true
            }
          } catch (e) {
            console.log(e)

            this.submitError = true
          }
        },
      },
    })
  },
}
