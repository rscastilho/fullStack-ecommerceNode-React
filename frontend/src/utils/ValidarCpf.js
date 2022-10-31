import {cpf} from 'cpf-cnpj-validator'

exports.validarCpf= (numero)=>{
    return cpf.isValid(numero)
}