import jwt from 'jsonwebtoken'

const generateJwt = (id, email, login, role) =>
  jwt.sign(
    { id, email, login, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )

export default generateJwt