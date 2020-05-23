export default function paramsSubscription(products) {
  let datas = []
  for (let i = 0, ln = products.length; i < ln; i++) {
    const productItem = products[i]
    productItem.products.forEach((item) => {
      for (let j = 0, lnItem = item.productRelations.length; j < lnItem; j++) {
        const relationProduct = item.productRelations[j]
        datas = [
          ...datas,
          {
            product: relationProduct.id,
            quantity: relationProduct.quantity,
          },
        ]
      }
    })
  }
  return datas
}
