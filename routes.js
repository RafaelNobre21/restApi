const express = require(`express`)
const router = express.Router()
const user = require(`./src/controllers/users`)
const message = user.message

router.get(`/registro`, (req, res) => {
    res.render(`Registro`, {
        message: message

    })
})


router.post(`/registro`, user.userRegister)
 
router.post(`/login`, user.userLogin,)

router.get('/login', (req, res) => {
    res.render('Login', {
        message: message
    });
});

router.patch(`/atualizar/:id`, user.updateUser)

router.delete(`/deletar/:id`, user.deleteUser)

module.exports = router;