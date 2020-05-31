import menu from '@components/menu'

export default {
  init() {
    console.log('> common init ----')

    menu.init()
    // JavaScript to be fired on all pages
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
}
