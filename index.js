const puppeteer = require('puppeteer')

const getAllProductNames = async (page) => {
  return await page.$$eval('h4.product-item-name', (items) => items.map(item => item.textContent))
}

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.hermes.com/ca/en/category/women/bags-and-small-leather-goods/bags-and-clutches/', {
    waitUntil: 'networkidle2'
  })
  const productNames = await getAllProductNames(page)
  console.log(productNames)
  await browser.close()
}


main()