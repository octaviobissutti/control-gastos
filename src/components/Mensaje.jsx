import React from 'react'

const Mensaje = ({tipo, children}) => {
    //Childer es todo lo que le pasas.
    return (
        <div className={`alerta ${tipo}`}>{children}</div>
    )
}

export default Mensaje
