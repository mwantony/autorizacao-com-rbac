require('dotenv').config()
const {InvalidArgumentError, NaoEncontrado, NaoAutorizado} = require('./src/erros')
const app = require('./app')
const port = 3000
require('./database')
require('./redis/blocklist-access-token')
require('./redis/allowlist-refresh-token')
const jwt = require('jsonwebtoken')

app.use((req, res, proximo) => {
  res.set({
    'Content-Type': 'application/json'
  })
  proximo()
})

const routes = require('./rotas')
routes(app)
app.use((erro, req, res, proximo) => {
  let status = 500
  const corpo = {
    mensagem: erro.message
  }

  if (erro instanceof InvalidArgumentError) {
    status = 400
  }
  if (erro instanceof jwt.JsonWebTokenError) {
    status = 401
  }
  if (erro instanceof jwt.TokenExpiredError) {
    status = 401
    corpo.expiradoEm = erro.expiredAt
  }
  if (erro instanceof jwt.NaoEncontrado) {
    status = 404
  }
  if (erro instanceof jwt.NaoAutorizado) {
    status = 401
  }

  res.status(status)
  res.json(corpo)
})
app.listen(port, () => console.log('A API está funcionando!'))
