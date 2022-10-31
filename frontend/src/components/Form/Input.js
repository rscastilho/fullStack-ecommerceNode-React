import React from 'react'
import styles from './Input.module.css'

const Input = ({labelValue, inputType, inputPlaceHolder, value, handleFunction}) => {
  return (
    <div>
        <label
        className='form-label'>{labelValue}</label>
        <input
        className={`${styles.input} form-control`} 
        type={inputType} 
        placeholder={inputPlaceHolder}
        value={value}
        onChange={handleFunction}
        />
    </div>
  )
}

export default Input