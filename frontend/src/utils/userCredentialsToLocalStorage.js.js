


const userCredentialToLocalStorage =(id, nome, email, token)=>{

    localStorage.setItem('@id', JSON.stringify(id))
    localStorage.setItem('@nome', JSON.stringify(nome))
    localStorage.setItem('@email', JSON.stringify(email))
    localStorage.setItem('@token', token)
return

}

module.exports = userCredentialToLocalStorage