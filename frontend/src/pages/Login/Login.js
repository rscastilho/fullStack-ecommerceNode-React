import React, { useState, useContext, useRef, useEffect } from 'react'
import styles from './Login.module.css'
import loginUser from './../../api/LoginApi'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { useNavigate } from 'react-router-dom'
import userCretendialsToLocalStorage from '../../utils/userCredentialsToLocalStorage.js'
import { AuthContext } from '../../context/AuthContext';
// import {GetPerfilByToken} from './../../utils/GetPerfilByToken'


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [resultado, setResultado] = useState('')
  const { setAuthenticated, setPerfil } = useContext(AuthContext)
  const emailRef = useRef()

  const data = { email, senha }



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(data)
      // if (result) {
      setResultado(result)
      // return
      // }
      if (result.token) {
        toast.success(result.message.toString(), { autoClose: 1000, position: 'bottom-center' })
        userCretendialsToLocalStorage(result.user.userId, result.user.nome, result.user.email, result.token.toString())
        setAuthenticated(true)
        navigate('/')
      } else {
        toast.error(result.message.toString(), { autoClose: 1000 })
        return
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1500 })
      return
    }
  }

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    localStorage.clear()
    setPerfil('')
    setAuthenticated('')
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.formulario}>
          <p className={styles.titulo}>Efetue o login</p>
          <form className={`${styles.formItens} `} onSubmit={handleLogin} >
            <div>
              <label>Email:</label>
              <input
                type="email"
                placeholder='Digite seu email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`form-control`}
                ref={emailRef}
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
                required
              />
            </div>
            <button
              type="submit"
              className={`form-control btn btn-primary mt-2`}
              disabled={email && senha ? false : true}
            >Logar</button>
            <button
              type='button'
              className={`form-control btn btn-secondary mt-1`}
              onClick={() => navigate('/register')}
            >
              Não tenho cadastro</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login