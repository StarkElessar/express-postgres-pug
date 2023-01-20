const { User } = require('./../models')

class AppController {
  getIndexPage(req, res) {
    res.render('pages/index', {
      pageTitle: 'Проверка работы!'
    })
  }

  createUser(req, res) {
    res.render('pages/createUser')
  }

  async allUsers(req, res) {
    const users = await User.findAll()
    const allUsers = []

    for (const { dataValues } of users) {
      allUsers.push(dataValues)
    }
    
    res.render('pages/allUsers', { users: allUsers })
  }
}

module.exports = new AppController()