import 'ant-design-vue/dist/antd.css'
import 'nprogress/nprogress.css'
import '~/styles/main.scss'

const features = {
  home: ['home'],
}

const { id } = document.body

if (features[id]) {
  features[id].unshift('common')
  features[id].forEach(async (feature) => {
    const m = await import(`./routes/${feature}`)
    m.default.init()
  })
}

window.addEventListener('DOMContentLoaded', () => {
  // log.textContent = log.textContent + 'load\n';
  // routes.loadEvents();
})
