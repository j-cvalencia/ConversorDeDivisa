import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const opciones = [
    { codigo: 'USD', nombre: 'Dólar estadounidense' },
    { codigo: 'COP', nombre: 'Peso colombiano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'MXN', nombre: 'Peso mexicano' },
    { codigo: 'ARS', nombre: 'Peso argentino' },
    { codigo: 'CLP', nombre: 'Peso chileno' },
    { codigo: 'PEN', nombre: 'Sol peruano' },
    { codigo: 'BRL', nombre: 'Real brasileño' },
    { codigo: 'VES', nombre: 'Bolívar venezolano' },
    { codigo: 'CAD', nombre: 'Dólar canadiense' },
    { codigo: 'BOB', nombre: 'Boliviano' },
    { codigo: 'PYG', nombre: 'Guaraní paraguayo' },
    { codigo: 'UYU', nombre: 'Peso uruguayo' },
    { codigo: 'GBP', nombre: 'Libra esterlina' },
    { codigo: 'CHF', nombre: 'Franco suizo' }
  ];

  const [valorInputAConvertir, setValorInputAConvertir] = useState(); 
  const [valorInputConvertida, setValorInputConvertida] = useState();
  const [datos, setDatos] = useState();
  const [tituloConversion,setTituloConversion] = useState('CONVERSOR DE DIVISAS');

  const manejarInput = (e) => {
    setValorInputAConvertir(e.target.value);
  }

  const llamarApi = async () => {
    const respuesta = await fetch('https://v6.exchangerate-api.com/v6/8fa39d2317e2e8b92861d620/latest/USD');
    const datos = await respuesta.json();
    setDatos(datos.conversion_rates);
  }

  useEffect(() => {
    llamarApi();
  }, [])

  const convertirMoneda = (e) => {
    e.preventDefault();
    
    let nombreMonedaAConvertir = e.target.children[0].children[1].value;
    let nombreMonedaConvertida = e.target.children[2].children[1].value;
    
    setValorInputConvertida((valorInputAConvertir * datos[nombreMonedaConvertida] / datos[nombreMonedaAConvertir]).toFixed(2));

    opciones.forEach((opcion) => {
      if (nombreMonedaAConvertir === opcion.codigo) {
        nombreMonedaAConvertir = opcion.nombre;
      }
    })

    opciones.forEach((opcion) => {
      if (nombreMonedaConvertida === opcion.codigo) {
        nombreMonedaConvertida = opcion.nombre;
      }
    })

    setTituloConversion(`Convertir de ${nombreMonedaAConvertir} a ${nombreMonedaConvertida}`);
  }
  
  return (
    <div className="w-full h-screen bg-blue-800 flex items-center justify-center relative">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white text-center absolute top-8">
        {tituloConversion}
      </h1>

      <form 
        onSubmit={convertirMoneda} 
        className="w-[95%] md:w-4/5 lg:w-3/5 h-[60vh] md:h-[50vh] bg-white rounded-2xl flex flex-col md:flex-row justify-center md:justify-around items-center shadow-[0px_5px_15px_black] relative p-4"
      >
        <div className="w-[90%] md:w-[45%] h-[8vh] md:h-[10vh] flex border-2 border-black rounded-2xl overflow-hidden">
          <input 
            type="number" 
            id="aConvertir" 
            value={valorInputAConvertir || ""} 
            onChange={manejarInput} 
            placeholder="Digite el valor"
            className="w-3/5 md:w-2/3 text-xl md:text-2xl text-center outline-none border-none"
          />
          <select 
            id="seleccionMonedaAConvertir"
            className="w-2/5 md:w-1/3 text-xl md:text-2xl text-center outline-none border-none bg-gray-300"
          >
            {opciones.map((opcion,index) => (
              <option key={index} value={opcion.codigo}>{opcion.codigo}</option>
            ))}
          </select>
        </div>

        <i className="fa-solid fa-right-long text-xl rotate-90 md:rotate-0 md:text-2xl my-5"></i>

        <div className="w-[90%] md:w-[45%] h-[8vh] md:h-[10vh] flex border-2 border-black rounded-2xl overflow-hidden">
          <input 
            type="number" 
            id="Convertida"  
            value={valorInputConvertida || ""} 
            disabled
            className="w-3/5 md:w-2/3 text-xl md:text-2xl text-center outline-none border-none bg-gray-100"
          />
          <select 
            id="seleccionMonedaConvertir"
            className="w-2/5 md:w-1/3 text-xl md:text-2xl text-center outline-none border-none bg-gray-300"
          >
            {opciones.map((opcion,index) => (
              <option key={index} value={opcion.codigo}>{opcion.codigo}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit"
          className="w-3/5 md:w-1/2 h-12 md:h-16 text-xl font-bold cursor-pointer border-2 border-blue-800 rounded-full bg-blue-800 hover:bg-blue-900 text-white absolute bottom-8 active:text-gray-400"
        >
          CONVERTIR
        </button>
      </form>
    </div>
  )
}

export default App;
