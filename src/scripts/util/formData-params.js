export default function formDataParams({ file, fileKey, params }) {
  const formData = new FormData()
  formData.append(fileKey, file)
  for (const key in params) {
    formData.append(key, params[key])
  }
  return formData
}
