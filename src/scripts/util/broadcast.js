export default function broadcast(name, value) {
  return function vm($vm) {
    let vm = $vm.$parent
    while (vm) {
      vm.$emit(name, value)
      vm = vm.$parent
    }
  }
}
