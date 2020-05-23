export default function blobToFile(file) {
  return new Promise(async (resolve) => {
    const response = await fetch(file)
    const blob = response.blob()
    resolve(blob)
  })
}
