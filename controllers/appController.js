class AppController {
  getIndexPage(req, res) {
    res.sendfile('index.html')
  }

  home(req, res) {
    res.render('pages/index', {
      pageTitle: 'Проверка работы шаблонизатора PUG'
    })
  }
}

module.exports = new AppController()