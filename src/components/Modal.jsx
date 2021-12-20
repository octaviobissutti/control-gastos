import React, { useState, useEffect } from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje';
const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCategoria(gastoEditar.categoria);
            setCantidad(gastoEditar.cantidad);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
          }
    }, [])



    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Validación
        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('');
            }, 3000)
            return;
        }
        //Si pasa la validación
        guardarGasto({
            cantidad,
            nombre,
            categoria,
            id,
            fecha
        })
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                src={CerrarModal}
                alt='Cerrar modal'
                onClick={ocultarModal}
                />
            </div>
            <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? 'animar': 'cerrar'}`}>
                {/* {error ? <Error /> : null} */}
                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor='nombre'>Nombre gasto</label>
                    <input 
                    id='nombre'
                    type='text'
                    placeholder='Añade tu gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad gasto</label>
                    <input 
                    id='cantidad'
                    type='number'
                    placeholder='Añade la cantidad de tu gasto: ej.300'
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoría gasto</label>
                   <select 
                   id="categoria"
                   value={categoria}
                   onChange={e => setCategoria(e.target.value)}
                   >
                      <option value="">--Seleccione--</option>
                      <option value="ahorro">Ahorro</option>
                      <option value="comida">Comida</option>
                      <option value="casa">Casa</option>
                      <option value="gastos">Gastos varios</option>
                      <option value="transporte">Ocio</option>
                      <option value="salud">Salud</option>
                      <option value="suscripciones">Suscripciones</option>
                   </select>
                </div>
                <input 
                type="submit"
                value={gastoEditar.nombre ? 'Guardar gasto' : 'Añadir gasto'}
                />
            </form>
        </div>
    )
}

export default Modal
