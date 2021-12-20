import React from 'react'
import Gasto from './Gasto';

//Si hay algún filtro activo voy a filtrar por gastos filtrados sino por los gastos.

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
    console.log('GASTOS FILTRADOS: ', gastosFiltrados);
    console.log('FILTRO: ', filtro);
    return (
        <div className='listado-gastos contenedor'>
            
            
            {
                filtro ? (
                    <>
                    <h2>{gastosFiltrados.length > 0 ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
                   { gastosFiltrados.map(gasto => 
                        <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                        />
                        )}
                    </>
                )
                : 
                (
                    <>
                    <h2>{gastos.length > 0 ? 'Gastos' : 'No hay gastos aún'}</h2>
                   { gastos.map(gasto => 
                        <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                        />
                        )}
                    </>
                )
            }
            
        </div>
    )
}

export default ListadoGastos
