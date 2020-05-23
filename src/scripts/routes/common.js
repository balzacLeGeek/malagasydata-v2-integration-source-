import signalementPaginator from '@components/my-paginator'

export default {
  init() {
    console.log('> common init ----')

    signalementPaginator.init()

    // pagination.init()
    // JavaScript to be fired on all pages
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
}
