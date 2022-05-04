const functions = require('@google-cloud/functions-framework')
const startJob = require('./startJob')

functions.http('webScraper', async (req, res) => {
  try{
    const output = await startJob()
    res.send(JSON.stringify(output))
  } catch(error) {
    console.error(error)
  }
})