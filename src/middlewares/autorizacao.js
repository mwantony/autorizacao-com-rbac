module.exports = (cargosObrigatorios) => (req, res, proximo) => {
  req.user.cargo = 'assinante'
  if (cargosObrigatorios.indexOf(req.user.cargo) === -1) {
    res.status(403)
    res.end()
    return
  }
  console.log(cargosObrigatorios.indexOf(req.user.cargo) === -1)
  proximo()
}
