import {
  DataTypes: {
    BOOLEAN,
    INTEGER,
    STRING,
  },
} from 'sequelize';
import sequelize from './../dp.js'

const User = sequelize.define('user', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: STRING, allowNull: false },
  firstName: { type: STRING, allowNull: true },
  lastName: { type: STRING, allowNull: true },
  email: { type: STRING, unique: true, allowNull: false },
  password: { type: STRING, allowNull: false },
  isActivated: { type: BOOLEAN, defaultValue: false },
  activationLink: { type: STRING },
  isAdmin: { type: BOOLEAN, defaultValue: false },
})

export default User
