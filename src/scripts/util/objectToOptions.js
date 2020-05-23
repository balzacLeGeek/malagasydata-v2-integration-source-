export default function objectToOptions(obj, number = false) {
  return (
    obj &&
    Object.keys(obj).map((item) => {
      return {
        id: number ? +item : item,
        label: obj[item],
      }
    })
  )
}
