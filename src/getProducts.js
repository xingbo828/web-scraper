const _mapNameAndLink = async (page) => {
  const products = await page.$$('div.product-item')
  const mappedProductsPromises =  products.map(async product => {
    const name = await product.$eval('h4.product-item-name', p => p.textContent)
    const link = await product.$eval('a', a => a.href)
    return {name, link}
  })
  const mappedProducts = await Promise.all(mappedProductsPromises)
  return mappedProducts
}

module.exports = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  const productNames = await _mapNameAndLink(page)
  return productNames
}