const puppeteer = require('puppeteer')
const config = require('./config')

const _getAllProductNames = async (page) => {
  const p = await page.$$eval('h4.product-item-name', (items) => items.map(item => item.textContent))
  return p
}

const _scanSite = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  const productNames = await _getAllProductNames(page)
  return productNames
}

module.exports = async () => {
  const browser = await puppeteer.launch()
  const products = {}
  console.log('---- Scanning US site ----')
  const usProducts = await _scanSite(browser, config.sites.us)
  products.us = usProducts
  console.log('---- Scanning CA site ----')
  const caProducts = await _scanSite(browser, config.sites.ca)
  products.ca = caProducts
  await browser.close()
  return products
}

