const functions = require('@google-cloud/functions-framework')
const startJob = require('./startJob')


functions.cloudEvent('webScraper', async (cloudEvent) => {
  startJob()
})