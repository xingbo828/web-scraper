const matchProducts = require('./matchProducts')

module.exports = async (users, products, sendNotification) => {
  const userRequestPromises = users.map(user => {
    const searchKeywords = user.searchKeywords
    const matchedUSProducts = matchProducts(products,  searchKeywords)
    if (matchedUSProducts.length === 0) {
      return Promise.resolve()
    }
    return Promise.all(matchedUSProducts.map(product => {
      return sendNotification(product, user)
    }))
  })
}