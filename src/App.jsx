import React, { useState, useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';


function App() {
  
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto'))) ?? 0;
  
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);

  //Cambia la clase del modal añadiendole una opacidad de 1.
  const [animarModal, setAnimarModal] = useState(false);
  
  //Editando los gastos
  const [gastoEditar, setGastoEditar] = useState({});

  //Si hay algo en LS va a ser un string por eso lo convierto en array con json.parse y si no hay nada me muestra un [] vacío.
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
 
  const [filtro, setFiltro] = useState('');

  //Este arreglo nos va a devolver los gastos filtrados, no puedo ponerlo en el array de gastos porque los sobrescribe.
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

const guardarGasto = gasto => {
  if(gasto.id) {
   //Si ya tiene un id lo vamos a actualizar
   const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
   setGastos(gastosActualizados);
   setGastoEditar({});

  } else {
    //Nuevo gasto
    gasto.id = generarId(); 
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);

  }
  
  setAnimarModal(false)
  setTimeout(() => {
    setModal(false)
    }, 500)
  }
  
  //Cuando apriete el botón editar quiero que se abra el modal siempre que el gasto tenga algo.
  useEffect(() => {
    //Si mi objeto gasto tiene algo va a llamar a la función que abre el modal.
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true);
   
      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])
  
  
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gastoActual => gastoActual.id !== id);
    setGastos(gastosActualizados);
  }
  

  //Agregando el presupuesto en localstorage
  useEffect(() => {
   localStorage.setItem('presupuesto', presupuesto ?? 0) //Si no hay presupuesto arranca en 0.
  console.log('presu: ', presupuesto);
  }, [presupuesto])
  
  // Agregando los gastos a LS
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [] ) //Stringify convierte un array en string.
  }, [gastos])

  //Lo usamos para que cuando exista un presupuesto válido no me muestre el presupuesto existente en la pantalla, sino en localstorage.
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  //Useeffect para los filtros
  useEffect(() => {
    if(filtro) {
      //Filtrando gastos x categoría
      const gastosFiltrados = gastos.filter((gasto) => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  return (
    <div className={modal ? 'fijar' : ''}>
     <Header 
     gastos={gastos}
     setGastos={setGastos}
     presupuesto={presupuesto}
     setPresupuesto={setPresupuesto}  
     isValidPresupuesto={isValidPresupuesto}
     setIsValidPresupuesto={setIsValidPresupuesto}
     />
     {isValidPresupuesto && (
       <>
       <main>
         <Filtros 
         filtro={filtro}
         setFiltro={setFiltro}
         />

         <ListadoGastos 
         gastos={gastos}
         setGastoEditar={setGastoEditar}
         eliminarGasto={eliminarGasto}
         filtro={filtro}
         gastosFiltrados={gastosFiltrados}
         />
       </main>
     <div className='nuevo-gasto'>
       <img 
       src={IconoNuevoGasto}
       alt='Icono nuevo gasto'
       onClick={handleNuevoGasto}
       />
     </div>
       </>
     )}
     {modal && <Modal 
     setModal={setModal}
     animarModal={animarModal}
     setAnimarModal={setAnimarModal}
     guardarGasto={guardarGasto}
     gastoEditar={gastoEditar}
     setGastoEditar={setGastoEditar}
     />}
    </div>
  )
}


export default App
