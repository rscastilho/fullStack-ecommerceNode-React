const express = require('express');
const router = express.Router();
const { register } = require('../../estoque.service/UserService/registerService');
const { login } = require('../../estoque.service/UserService/loginService');
const { logout } = require('../../estoque.service/UserService/logoutService');
const { pegarUserById, updateUser, deleteUser, getlAllUsers, updateAvatarUser, getUsersByNome } = require('../../estoque.service/UserService/UserService');
const { imageUpload } = require('../../estoque.crosscutting/uploadImages/uploadImages');
const validator = require('../../estoque.crosscutting/validations/validator');
const { userRegisterValidation, loginValidation, updateUserValidation } = require('../../estoque.crosscutting/validations/userValidation');
const authAdmin = require('./../../estoque.crosscutting/auth/AuthAdmin');
const authUser = require('./../../estoque.crosscutting/auth/AuthUser');

//rotas testes
router.get('/', authUser, (req, res) => {
  res.json('chegou no get auth');
});
router.get('/dashboard', authAdmin, (req, res) => {
  res.json('somente admin');
});

//rotas login e registro
router.post('/register', userRegisterValidation(), validator, register);
router.post('/login', loginValidation(), validator, login);
//
router.get('/logout', logout);

//rotas usuarios
router.get('/getAll', authAdmin, getlAllUsers);
router.get('/details/:id', authUser, pegarUserById);
router.get('/nomeusuario/:nome', authAdmin, getUsersByNome);
router.post('/deleteuser/:id', authAdmin, deleteUser);
router.put('/update/:id', authUser, updateUserValidation(), validator, updateUser);
router.put('/updateavatar/:id', authUser, imageUpload.single('imagemperfil'), updateAvatarUser);

module.exports = router;
