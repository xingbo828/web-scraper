module.exports = (products, searchKeywords) => {
  return products.filter(product => {
    const productName = product.name.trim().toLowerCase()
    return searchKeywords.map(s => s.trim().toLowerCase()).some(keyword => productName.includes(keyword))
  })
}