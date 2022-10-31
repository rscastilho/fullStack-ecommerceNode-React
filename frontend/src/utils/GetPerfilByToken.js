import jwtdecode from 'jwt-decode'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'


export const GetPerfilByToken = async (token) => {
    const validaPerfil = jwtdecode(token);
    const { setPerfil } = useContext(AuthContext);

    // if (validaPerfil.perfil === 'Administrador') {
    //     return('Administrador')
        
    // } else if (validaPerfil.perfil === 'Visitante') {
    //     return('Visitante')
        
    // } else {
    //     return('algumacoisa')
    // }


    switch (validaPerfil.perfil) {
        case 'Administrador':
            setPerfil('Administrador')
            // return 'Administrador';
            break;
        case 'Visitante':
            setPerfil('Visitante')
            // return 'Visitante';
            break;
        default:
            // setPerfil('')
            return console.log("Perfil vazio")

    }
}

// export default GetPerfilByToken








