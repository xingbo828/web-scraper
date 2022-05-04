const functions = require('@google-cloud/functions-framework')
const puppeteer = require('puppeteer')
const twilio = require('twilio')

const config = require('./config')
const getProducts = require('./getProducts')
const getSecret = require('./getSecret')
const processUsers = require('./processUsers')
const sendNotification = require('./sendNotification')

functions.http('hermesScraper', async (req, res) => {
  try{
    const users = await getSecret({ projectId: config.projectId, secretId:  config.secretId })
    const twilioAccountStr = await getSecret({ projectId: config.projectId, secretId: config.twilioSecretId })
    const twilioAccount = JSON.parse(twilioAccountStr)
    const twilioClient = twilio(twilioAccount.SID, twilioAccount.TOKEN)
    const browser = await puppeteer.launch()
    // Scan US site
    const usProducts = await getProducts(browser, config.sites.us)
    console.info('US products:', usProducts)
    await processUsers(JSON.parse(users), usProducts, sendNotification(twilioClient))
    await browser.close()
    res.send('ok')
  } catch(error) {
    console.error(error)
  }
})