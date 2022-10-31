const mysql = require('../../estoque.data/db/DbContext')
const _perfisRepository = require('../../estoque.data/repositories/perfisRepository')

exports.addUserPerfil = async (req, res)=>{

    const result = await _perfisRepository.addUserPerfil(usuarioId, funcaoId)
}
