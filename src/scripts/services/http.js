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
        return Promise.reject(error.response)
      }
    )

    return instance
  }

  get = async (params) => {
    const { apiPrefix } = params
    const url = typeof apiPrefix === 'undefined' ? `${process.env.API_PREFIX}${params.url}` : params.url

    return await this.axios(params.loader)
      .get(url, { params: params.data })
      .then((response) => {
        return response
      })
      .catch((e) => {
        Pace.done()
        return e
      })
  }

  post = async (params) => {
    const { apiPrefix } = params
    const url = typeof apiPrefix === 'undefined' ? `${process.env.API_PREFIX}${params.url}` : params.url

    return await this.axios(params.loader)
      .post(url, params.data)
      .then((response) => {
        return response
      })
      .catch((e) => {
        Pace.done()
        return e
      })
  }

  put = async (params) => {
    const { apiPrefix } = params
    const url = typeof apiPrefix === 'undefined' ? `${process.env.API_PREFIX}${params.url}` : params.url

    return await this.axios(params.loader)
      .put(url, params.data)
      .then((response) => {
        return response
      })
      .catch((e) => {
        Pace.done()
        return e
      })
  }

  delete = async (params) => {
    const { apiPrefix } = params
    const url = typeof apiPrefix === 'undefined' ? `${process.env.API_PREFIX}${params.url}` : params.url

    return await this.axios(params.loader)
      .delete(url, params.data)
      .then((response) => {
        return response
      })
      .catch((e) => {
        Pace.done()
        return e
      })
  }
}

export default new Http()
