import '../scss/styles.scss'

import restApi from './modules'

document.addEventListener('DOMContentLoaded', () => {
  class Home {
    logger(string) {
      console.log(`Page loaded ${string}`)
    }
  }

  const home = new Home()
  
  home.logger('on port 3000')
  console.log('Hot Reload...')
  restApi()
})