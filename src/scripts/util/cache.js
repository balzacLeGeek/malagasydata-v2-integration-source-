function cache() {
  let cacheObject = {}
  return {
    set(key, value) {
      cacheObject[key] = value
    },
    get(key) {
      return cacheObject[key]
    },
    delete(key) {
      delete cacheObject[key]
    },
    clear() {
      cacheObject = {}
    },
  }
}

export default cache()
