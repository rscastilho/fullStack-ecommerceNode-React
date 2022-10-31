import React, { useEffect, useMemo, useState } from 'react'
import styles from './GetAllUsers.module.css'
import { getAllUsers } from '../../../api/UserApi'
import { UtilService } from './../../../utils/UtilService';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { RiDeleteBin2Line, RiEdit2Line } from 'react-icons/ri'
import PageTitle from '../../../components/Title/PageTitle';
import GetUsersByName from '../../../components/GetUsersByName/GetUsersByName';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [registros, setRegistros] = useState('')
  const [mostraAcao, setMostraAcao] = useState(false)
  const [mostraAvatar, setMostraAvatar] = useState(false)

  const acao = () => {
    setMostraAcao(!mostraAcao)
  }


  const mostrarAvatar = () => {
    setMostraAvatar(!mostraAvatar)
  }

  const getAll = async () => {
    try {
      const result = await getAllUsers();
      setRegistros(result.registros)
      setUsers(result.data || result)
    } catch (error) {
      alert(error)
      console.log(error.message)
      return
    }
  }

  useMemo(() => {
    // if (users.length < 1) {
    getAll()
    // }
    // console.log('users', users.data)
  }, [])

  return (
    <div>
      {users && users.length > 0 ?
        <>
        <PageTitle
          title={'Usuários cadastrados'}
          subtitle={'Informações referentes aos usuários cadastrados no sistema'}
        />
          <div className={`${styles.acao}`}>
            <GetUsersByName
              setUsers={setUsers}
              setRegistros={setRegistros}
            />
          </div>
          <div>
            <table className='table table-sm table-striped table-hover shadow-sm'>
              <thead>
                <tr className='text-center'>
                  <th onClick={mostrarAvatar}>
                    <button className={`${styles.btnAvatar} btn`}>
                      {mostraAvatar ?
                        <>
                          <FaEyeSlash
                            size={'1.3em'}
                            className={`me-1`}
                          />
                          Ocultar
                        </>
                        :
                        <>
                          <FaEye
                            size={'1.3em'}
                            className={`me-1`}
                          />
                          Exibir
                        </>
                      }
                    </button>
                  </th>
                  <th>Nome</th>
                  <th>e-mail</th>
                  <th>CPF</th>
                  <th>Bloqueado</th>
                  <th>Deletado</th>
                  <th>Criado em:</th>
                  <th>Expirar em:</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((userData, i) => (
                  <tr
                    key={i}
                    className={`${styles.tableLine} text-center`}
                  >
                    <td>
                      {mostraAvatar &&
                        <>
                          <img
                            className={`${styles.imgAvatar}`}
                            src={`http://localhost:5000/imagens/${userData.imagemperfil}`}
                            alt={userData.imagemperfil}
                            onClick={acao}
                          />
                        </>
                      }
                    </td>
                    <td className='text-start'
                      onClick={acao}
                    > {userData.nome}</td>
                    <td className='text-start'
                      onClick={acao}
                    > {userData.email}</td>
                    <td onClick={acao}> {UtilService.cpf(userData.cpf)}</td>
                    <td className='text-center'>
                      <input
                        type="checkbox"
                        defaultChecked={userData.blocked ? true : false}
                        disabled
                      />
                    </td>
                    <td className='text-center'>
                      <input
                        type="checkbox"
                        defaultChecked={userData.deleted ? true : false}
                        disabled
                      />
                    </td>
                    <td className='text-end'> {UtilService.formatShortDate(userData.createAt)}</td>
                    <td className='text-end'> {UtilService.formatShortDate(userData.passwordExpirationDate)}</td>
                    {mostraAcao &&
                      <>
                        <td >
                          <button className='btn btn-sm btn-warning'>
                            <RiEdit2Line size={'1.5em'} />
                          </button>
                          <button className='btn btn-sm btn-danger ms-1'>
                            <RiDeleteBin2Line size={'1.5em'} />
                          </button>
                        </td>
                      </>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="registros text-end">
            <span>
              {registros} registros encontrados
            </span>
          </div>
        </>
        :
        <>
          <span>
            <p className={`${styles.erroAutorizacao} alert alert-danger w-75`}>{users.message}</p>
          </span>
          <div className="registros text-end">
          </div>
        </>
      }
    </div>
  )
}

export default GetAllUsers