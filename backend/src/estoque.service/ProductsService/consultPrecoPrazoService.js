const consultarPrecoPrazo = require('../../estoque.crosscutting/cepFrete/frete')

const consultaPrecoPrazo = async (req, res) => {
    try {
        const { sCepDestino } = req.body;
        const sCepOrigem = "81200100"
        const nVlPeso = 5
        // Formato
        // 1 = Formato caixa/pacote
        // 2 = Formato rolo/prisma
        // 3 = Envelope
        const nCdFormato = 1
        //comprimento, altura e largura diametro em decimal e em centimetros
        const nVlComprimento = 40.5
        const nVlAltura = "20"
        const nVlLargura = "20"
        // tipos de servico
        // 04014 = SEDEX à vista
        // 04065 = SEDEX à vista pagamento na entrega
        // 04510 = PAC à vista
        // 04707 = PAC à vista pagamento na entrega
        // 40169 = SEDEX12 ( à vista e a faturar)
        // 40215 = SEDEX 10 (à vista e a faturar)
        // 40290 = SEDEX Hoje Varejo
        const nCdServico = ["04014"]
        const nVlDiametro = "0"
        const args = {
            sCepOrigem, sCepDestino, nVlPeso, nCdFormato, nVlComprimento, nVlAltura, nVlLargura, nCdServico, nVlDiametro
        }
        const result = await consultarPrecoPrazo(args)
        if(!result){
            res.status(404).json({message:"Erro ao pesquisar CEP"})
        } else{
            res.status(200).json(result)
    }
    } catch (error) {
        res.status(400).json({"Erro encontrato": error})
        console.log(error)
        return error
    }
    
}

module.exports = consultaPrecoPrazo