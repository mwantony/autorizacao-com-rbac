const autorizacao = require('./autorizacao')

module.exports = (entidade, acao) => (req, res, proximo) => {
  if (req.estaAutenticado) {
    return autorizacao(entidade, acao)(req, res, proximo)
  }
  proximo()
}
