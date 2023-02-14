import bcrypt from 'bcrypt'
import ApiError from './../services/ApiError.js'
import generateJwt from './../services/generateJwt.js'
import { User } from './../models/index.js'

class UserController {
  async createUser(req, res, next) {
    const { login, email, password } = req.body

    if (!login || !email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }

    const candidate = await User.findOne({ where: { email } })

    console.log({candidate});
    
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }

    const SALT = 5
    const hashPassword = await bcrypt.hash(password, SALT)
    const user = await User.create({ login, email, password: hashPassword, roleId: 1 })
    const token = generateJwt(user.id, user.email, user.login, user.userRole)

    return res.json({ token })
  }

  async getUser(req, res, next) { 
    const { id } = req.params
    const currentUser = await User.findOne({ where: { id } })
    
    if (!currentUser) {
      return next(ApiError.badRequest('Нет пользователя с таким ID'))
    }

    return res.json(currentUser)
  }
  
  async getUsers(req, res, next) {
    const users = await User.findAll()

    if (!users) {
      return next(ApiError.badRequest('Пользователи еще не созданы'))
    }

    return res.json(users)
  }

  async updateUser(req, res) { }
  
  async deleteUser(req, res, next) {
    const { id } = req.params
    const currentUser = await User.destroy({ where: { id } })
    
    if (!currentUser) {
      return next(ApiError.badRequest('Нет пользователя с таким ID'))
    }

    res.json({ message: 'Пользователь успешно удалён' })
  }
}

export default new UserController()