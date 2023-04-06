const express = require(`express`)
const router = express.Router()
const user = require(`./controllers/users`)



router.post(`/Registro`, user.userRegister)

router.get(`/Login`, user.userLogin)

router.patch(`/Atualizar/:id`, user.updateUser)

router.delete(`/Deletar/:id`, user.deleteUser)

module.exports = router;