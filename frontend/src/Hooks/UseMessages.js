import React from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UseMessages = (tipo, mensagem)=>{

  const message = ()=>{
    toast`.${tipo}`(mensagem)
  }

 return(

  <message/>

 )

}

export {UseMessages}