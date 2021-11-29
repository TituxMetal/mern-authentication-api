const getAll = (req, res) => {
  res.status(200).json({ message: 'Users Controller => getAll' })
}

const getSingle = (req, res) => {
  res.status(200).json({ message: 'Users Controller => getSingle' })
}

const update = (req, res) => {
  res.status(200).json({ message: 'Users Controller => update' })
}

const remove = (req, res) => {
  res.status(200).json({ message: 'Users Controller => remove' })
}

export default { getAll, getSingle, remove, update }
