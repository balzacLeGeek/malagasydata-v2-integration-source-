import axios from 'axios'
import Pace from 'nprogress'

let numberOfAjaxCAllPending = 0

class Http {
  axios = (loader = true) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token)
    Pace.options = {
      restartOnPushState: true,
      restartOnRequestAfter: true,
    }
    if (loader) {
      Pace.start()
    }

    const instance = axios.create({
      baseURL: process.env.BASE_URL,
      headers: { Authorization: AuthStr },
    })
    instance.interceptors.request.use(
      function (config) {
        numberOfAjaxCAllPending++
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      function (response) {
        numberOfAjaxCAllPending--
        if (numberOfAjaxCAllPending == 0) {
          Pace.done()
          const event = new CustomEvent('ajax-done')
          document.dispatchEvent(event)
        }
        return response
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    return instance
  }

  get = async (params) => {
    return await this.axios(params.loader)
      .get(params.url, { params: params.data })
      .then((response) => {
        return response
      })
      .catch((e) => {
        Pace.done()
        return e
      })
  }

  post = async (params) => {
    return await this.axios(params.loader)
      .post(params.url, params.data)
      .then((response) => {
        return response
      })
      .catch((e) => {
        return e
      })
  }

  put = async (params) => {
    return await this.axios(params.loader)
      .put(params.url, params.data)
      .then((response) => {
        return response
      })
      .catch((e) => {
        return e
      })
  }

  delete = async (params) => {
    return await this.axios(params.loader)
      .delete(params.url, params.data)
      .then((response) => {
        return response
      })
      .catch((e) => {
        return e
      })
  }
}

export default new Http()
