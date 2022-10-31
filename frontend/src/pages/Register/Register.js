import React, { useState } from 'react'
import styles from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import register from '../../api/RegisterApi'
import { cpf as cpfs } from 'cpf-cnpj-validator'
import { toast } from 'react-toastify'


const Register = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const data = {
    nome, email, cpf, senha, confirmarSenha
  }
  const validarCpf = (numero) => {
    return cpfs.isValid(numero)
  }

  const validaSenha = (senhaUm, senhaDois) => {
    if (senhaUm.trim() !== senhaDois.trim()) {
      return false
    }
  }

  const limpaForm = ()=>{
  setNome('');
  setEmail('');
  setCpf('');
  setSenha('');
  setConfirmarSenha('');
  }

  const efetiveRegister = async () => {
    if (validarCpf(cpf.trim()) === true) {
      if (validaSenha(senha, confirmarSenha) === false) {
        toast.error("Senhas devem ser iguais")
        return
      } else {
        const result = await register(data);
        limpaForm()
        toast.info(result.message)
        navigate('/login')
        
        return
      }
    }
    else {
      toast.error("cpf invalido")
      return
    }
  }
  const handleRegister = (e) => {
    e.preventDefault()
    efetiveRegister()
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.formulario}>
          <p className={styles.titulo}>Registrar novo usuário</p>
          <form className={`${styles.formItens} `} onSubmit={handleRegister} >
            <div>
              <label>Nome:</label>
              <input
                type="text"
                placeholder='Digite seu nome'
                onChange={(e) => setNome(e.target.value)}
                value={nome}
                className={`form-control`}
                minLength={4}
                maxLength={60}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                placeholder='Digite seu email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`form-control`}
                minLength={4}
                maxLength={100}
                required
              />
            </div>
            <div>
              <label>CPF:</label>
              <input
                type="text"
                placeholder='Digite seu CPF'
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
                className={`form-control`}
                maxLength={15}
                required
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                placeholder='********'
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
                className={`form-control`}
                minLength={6}
                maxLength={20}
                required
              />
            </div>
            <div>
              <label>Confirmar Senha:</label>
              <input
                type="password"
                placeholder='Confirmar senha'
                onChange={(e) => setConfirmarSenha(e.target.value)}
                value={confirmarSenha}
                className={`form-control`}
                minLength={6}
                maxLength={20}
                required
              />
            </div>
            <button
              type="submit"
              className={`form-control btn btn-primary mt-2`}
              disabled={email && senha ? false : true}
            >Registrar</button>
            <button
              type='button'
              className={`form-control btn btn-secondary mt-1`}
              onClick={() => navigate('/login')}
            >
              Voltar</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register