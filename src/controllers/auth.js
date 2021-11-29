const login = (req, res) => {
  res.status(200).json({ message: 'Auth Controller => login' })
}

const register = (req, res) => {
  res.status(200).json({ message: 'Auth Controller => register' })
}

const forgot = (req, res) => {
  res.status(200).json({ message: 'Auth Controller => forgot' })
}

const reset = (req, res) => {
  res.status(200).json({ message: 'Auth Controller => reset' })
}

export default { forgot, login, register, reset }
