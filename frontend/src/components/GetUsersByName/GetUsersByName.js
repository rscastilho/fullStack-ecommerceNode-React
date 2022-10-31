import React, { useRef, useState } from 'react'
import { FcSearch } from 'react-icons/fc';
import { getUsersByName, getAllUsers } from '../../api/UserApi'
import styles from './GetUserByName.module.css'

const GetUsersByName = ({ setUsers, setRegistros }) => {
    const [nome, setNome] = useState('');
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef();

    const focusSearch = () => {
        setShowInput(!showInput)
        if (!showInput) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 400)
        }
    }
    const searchUser = async (e) => {
        try {
            setNome(e.target.value)
            if (nome.trim().length >= 3) {
                const result = await getUsersByName(nome);
                setRegistros(result.registros)
                setUsers(result.data || result)
            } else if (nome.length < 3) {
                const result = await getAllUsers();
                setRegistros(result.registros)
                setUsers(result.data || result)
            }
        } catch (error) {
            console.log(error)
            return
        }
    }


    return (
        <>
            <FcSearch
                size={'1.7em'}
                onClick={focusSearch}
                className={`${styles.iconSearch}`}
            />
            {showInput &&
                <input
                    type="text"
                    value={nome}
                    onChange={searchUser}
                    placeholder={"Pesquisar"}
                    ref={inputRef}
                />
            }
        </>
    )
}


export default GetUsersByName