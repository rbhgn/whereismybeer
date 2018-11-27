import * as request from 'superagent'

export const getBeers = () => {
  console.log('beers')
  request
  .get(`https://downloads.oberon.nl/opdracht/bieren.js`)
  .then(result => JSON.parse(result.text).beers)
  .catch(err => console.error(err))
  }