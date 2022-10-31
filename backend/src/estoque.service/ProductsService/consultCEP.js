const consultarCEP = require("../../estoque.crosscutting/cepFrete/cep");


const consultCep = async (req, res) => {

    const { cep } = req.body;
    const result = await consultarCEP(cep)
    res.json(result)
}


module.exports = consultCep