const freeze = (object, property, value) => {
  Object.defineProperty(object, property, {
    configurable: true,
    get() {
      return value
    },
    set(v) {
      console.warn(`tried to set frozen property ${property} with ${v}`)
    },
  })
}

const unfreeze = (object, property, value = null) => {
  Object.defineProperty(object, property, {
    configurable: true,
    writable: true,
    value: value,
  })
}

const fragment = {
  abstract: true,
  name: 'Fragment',

  props: {
    name: {
      type: String,
      default: () => Math.floor(Date.now() * Math.random()).toString(16),
    },
  },

  mounted() {
    const container = this.$el
    const parent = container.parentNode

    const head = document.createComment(`fragment#${this.name}#head`)
    const tail = document.createComment(`fragment#${this.name}#tail`)

    parent.insertBefore(head, container)
    parent.insertBefore(tail, container)

    container.appendChild = (node) => {
      parent.insertBefore(node, tail)
      freeze(node, 'parentNode', container)
    }

    container.insertBefore = (node, ref) => {
      parent.insertBefore(node, ref)
      freeze(node, 'parentNode', container)
    }

    container.removeChild = (node) => {
      parent.removeChild(node)
      unfreeze(node, 'parentNode')
    }

    Array.from(container.childNodes).forEach((node) =>
      container.appendChild(node)
    )

    parent.removeChild(container)

    freeze(container, 'parentNode', parent)
    freeze(container, 'nextSibling', tail.nextSibling)

    const insertBefore = parent.insertBefore
    parent.insertBefore = (node, ref) => {
      insertBefore.call(parent, node, ref !== container ? ref : head)
    }

    const removeChild = parent.removeChild
    parent.removeChild = (node) => {
      if (node === container) {
        while (head.nextSibling !== tail)
          container.removeChild(head.nextSibling)

        parent.removeChild(head)
        parent.removeChild(tail)
        unfreeze(container, 'parentNode')

        parent.insertBefore = insertBefore
        parent.removeChild = removeChild
      } else {
        removeChild.call(parent, node)
      }
    }

    head.remove()
    tail.remove()
  },

  render(h) {
    const children = this.$slots.default

    // add fragment attribute on the children
    if (children && children.length)
      children.forEach(
        (child) =>
          (child.data = {
            ...child.data,
            attrs: { ...(child.data || {}).attrs },
          })
      )

    return h('div', {}, children)
  },
}

export default fragment
export const FragmentPlugin = {
  install: function (Vue) {
    Vue.component('Fragment', fragment)
  },
}
