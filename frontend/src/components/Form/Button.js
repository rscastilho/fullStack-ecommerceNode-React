import React from 'react'

const Button = ({ value, btnColor, btnType, handleClick,btnMarginStart,btnMarginEnd }) => {
    return (
        <>
            <button
                className={`btn btn-${btnColor} ms-${btnMarginStart} me-${btnMarginEnd}`}
                type={btnType}
                onClick={handleClick}
            >{value}</button>
        </>
    )
}

export default Button