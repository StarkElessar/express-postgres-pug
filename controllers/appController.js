class AppController {
  getIndexPage(req, res) {
    res.render('pages/index', {
      pageTitle: 'Проверка работы!'
    })
  }
}

module.exports = new AppController()