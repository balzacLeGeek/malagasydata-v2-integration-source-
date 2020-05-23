<script>
import Button from 'ant-design-vue/lib/button'
import { default as antMessage} from 'ant-design-vue/lib/message'

import { MESSAGE, RESPONSE } from '@constants/'
import Fragment from '@lib/fragment'
import { Authentication } from '@controllers/login-controller'

export default {
  name: 'MyLogin',
  components: {
    Button,
    Fragment,
  },
  props: {
    csrfToken: {
      type: String,
      required: true,
    }
  },
  data: function () {
    return {
      loading: false,
      userCredential: {
        email: '',
        password: '',
        _csrf_token: this.csrfToken
      },
      errors: {
        email: false,
        emailNotValid: false,
        password: false,        
      },
      authError: null
    }
  },
  methods: {
    formIsValid: function() {
      this.authError = null
      const info = this.userCredential

      let errors = []
      const excludedFields = ['_csrf_token']

      for (let field in info) {
        if (!excludedFields.includes(field)) {
          if (info[field] === '') {
            errors.push(field)
            this.errors[field] = true
          } else {
            if (field === 'email') {
              if (this.mailValidation(info.email)) {
                this.errors.emailNotValid = false
                this.errors.email = false

              } else {
                this.errors.emailNotValid = true
                errors.push(field)
              }
            } else {
              this.errors[field] = false
            }
          }
        }
      }

      return errors.length === 0
    },
    processLogin: async function () {
      if (!this.formIsValid()) {
        return
      }

      try {
        this.authError = null
        this.loading = true
        let params = this.userCredential
        
        const { status, data } = await Authentication(params)

        if (status === RESPONSE.HTTP_OK) {
          this.loading = false
          localStorage.setItem('_mytoken', data._token)

          if (data.previous_url) {
            window.location.href = data.previous_url

            return
          }

          antMessage.success(data.message).then(() => {
            window.location.href = data.redirect_url
          })

          return
        }

        this.loading = false

        antMessage.error(data.message)
        this.authError = data.message

      } catch (error) {
        this.loading = false
        antMessage.error(MESSAGE.common.serverError)
        console.log(error)
      }
    },
    mailValidation: function(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return re.test(email)
    },
    onInputKeyUp: function($event, key) {
      this.authError = null
      const info = this.userCredential

      if ($event.target.value === '') {
        this.errors[key] = true
      } else {
        if (key === 'email') {
          if (this.mailValidation(info.email)) {
            this.errors.emailNotValid = false
            this.errors.email = false

          } else {
            this.errors.emailNotValid = true
          }
        } else {
          this.errors[key] = false
        }
      }
    }
  }
}
</script>
<template>
  <fragment>
    <div class="card-header">
      Connexion à votre compte
    </div>
    <div class="card-body">
      <form id="form-login" novalidate>
        <floating :error="errors.email || errors.emailNotValid || authError !== null">
          <label>Adresse email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            v-model="userCredential.email"
            @keyup="onInputKeyUp($event, 'email')"
          />
          <span 
            v-if="errors.email || errors.emailNotValid"
            class="validation-msg error show"
          >
            {{ errors.emailNotValid ? `Adresse email non validate` : `Adresse email obligatoire` }}
          </span>
        </floating>
        <floating :error="errors.password || authError !== null">
          <label>Votre mot de passe</label>
          <input
            type="password"
            class="form-control"
            name="password"
            v-model="userCredential.password"
            @keyup="onInputKeyUp($event, 'password')"
          />
          <span 
            v-if="errors.password"
            class="validation-msg error show">Mot de passe obligatoire
          </span>
        </floating>

        <p v-if="authError" class="auth-error">{{ authError }}</p>

        <p class="btn-wrapper">
          <a-button class="btn btn-primary" :loading="loading" @click.prevent="processLogin">
            Se connecter
          </a-button>
        </p>
        <p class="mdp-link">
          <a href="javascript:;">Mot de passe oublié ?</a>
        </p>
      </form>
    </div>
  </fragment>
</template>
