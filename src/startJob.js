const puppeteer = require('puppeteer')
const config = require('./config')

const _getAllProductNames = async (page) => {
  return await page.$$eval('h4.product-item-name', (items) => items.map(item => item.textContent))
}

const _scanSite = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  const productNames = await _getAllProductNames(page)
  console.log(productNames)
  return productNames
}

module.exports = async () => {
  const browser = await puppeteer.launch()
  console.log('---- Scanning US site ----')
  await _scanSite(browser, config.sites.us)
  console.log('---- Scanning CA site ----')
  await _scanSite(browser, config.sites.ca)
  await browser.close()
}

