const express = require('express')
const fetch = require('isomorphic-fetch')
const app = express()
const port = 3000
app.use(express.json())
const BaseUrl = 'http://www.victoire-oberkampf.fr/NFT-Workshop/SongForACity.json'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function fetchCMC () {
  return fetch(`${BaseUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(fetchResponse => {
      return fetchResponse.json()
    })
    .then(responseData => {
      // const errorCode = responseData.status.error_code
      // if (errorCode !== 0) {
      //   throw new Error(responseData.status.error_message)
      // }
      return responseData.data
    })
}
app.get('/metadata', function getRoot (req, res) {
  fetchCMC()
    .then(metadata => {
      res.json({
        success: true,
        metadata: metadata.map(data => ({
          name: data.properties.name.description,
          description: data.metadata.properties.description,
          image: data.properties.image.description
        }))
      })
    })
    .catch(error => {
      res.json({
        success: false,
        message: error.message
      })
    })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
