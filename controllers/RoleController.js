const { Role } = require('../models/roleModel')
const ApiError = require('./../services/ApiError')

class RoleController {
  async createRole(req, res) {
    const { name } = req.body

    if (!name) {
      return ApiError.badRequest('Невозможно отправить пустое поле')
    }

    const role = await Role.findOne({ where: { name } })

    if (role) {
      return console.error('Такая роль уже существует')
    }

    const newRole = await Role.create({ name })

    res.json({ newRole, message: 'Роль успешно создана'})
  }

  async getRole(req, res) {}
  async getRoles(req, res) {}
  async updateRole(req, res) {}
  async deleteRole(req, res) {}
}

module.exports = new RoleController()