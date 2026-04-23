import { useEffect, useState } from 'react';

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
  { codigo: 'CHF', nombre: 'Franco suizo' },
];

function App() {
  const [valorFrom, setValorFrom] = useState('');
  const [valorTo, setValorTo] = useState('');
  const [monedaFrom, setMonedaFrom] = useState('USD');
  const [monedaTo, setMonedaTo] = useState('COP');
  const [rates, setRates] = useState(null);
  const [tasa, setTasa] = useState('');
  const [titulo, setTitulo] = useState('¿Cuánto quieres convertir?');

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/8fa39d2317e2e8b92861d620/latest/USD')
      .then(r => r.json())
      .then(d => setRates(d.conversion_rates));
  }, []);

  const convertir = (e) => {
    e.preventDefault();
    if (!rates || !valorFrom) return;

    const resultado = (valorFrom * rates[monedaTo] / rates[monedaFrom]).toFixed(2);
    setValorTo(resultado);
    setTitulo(`${monedaFrom} → ${monedaTo}`);
    setTasa(`1 ${monedaFrom} = ${(rates[monedaTo] / rates[monedaFrom]).toFixed(2)} ${monedaTo}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-700 to-blue-800 flex flex-col items-center justify-center p-6 gap-8">

      {/* Encabezado */}
      <div className="text-center">
        <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-2">
          Conversor de divisas
        </p>
        <h1 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
          {titulo}
        </h1>
      </div>

      {/* Card */}
      <form
        onSubmit={convertir}
        className="w-full max-w-lg bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-7 flex flex-col gap-5 shadow-xl"
      >
        {/* Inputs */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">

          {/* Desde */}
          <div className="w-full min-w-0 flex flex-col gap-2">
            <label className="text-white/55 text-xs font-semibold tracking-widest uppercase">
              Desde
            </label>
            <div className="flex w-full rounded-xl overflow-hidden bg-white/10 border border-white/20 focus-within:border-white/50 focus-within:bg-white/15 transition">
              <input
                type="number"
                value={valorFrom}
                onChange={e => setValorFrom(e.target.value)}
                placeholder="0.00"
                min="0"
                step="any"
                className="flex-1 bg-transparent text-white text-lg font-medium placeholder-white/30 outline-none px-4 py-3 min-w-0"
              />
              <select
                value={monedaFrom}
                onChange={e => setMonedaFrom(e.target.value)}
                className="bg-transparent text-white text-sm font-semibold outline-none px-3 border-l border-white/15 cursor-pointer"
              >
                {opciones.map(op => (
                  <option key={op.codigo} value={op.codigo} className="bg-blue-900">
                    {op.codigo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Flecha */}
          <div className="text-white/40 text-2xl rotate-90 md:rotate-0 md:mt-5 flex-shrink-0">
            ⇄
          </div>

          {/* Hacia */}
          <div className="w-full min-w-0 flex flex-col gap-2">
            <label className="text-white/55 text-xs font-semibold tracking-widest uppercase">
              Hacia
            </label>
            <div className="flex w-full rounded-xl overflow-hidden bg-white/8 border border-white/20 transition">
              <input
                type="number"
                value={valorTo}
                disabled
                placeholder="—"
                className="flex-1 bg-transparent text-white/70 text-lg font-medium placeholder-white/25 outline-none px-4 py-3 min-w-0"
              />
              <select
                value={monedaTo}
                onChange={e => setMonedaTo(e.target.value)}
                className="bg-transparent text-white text-sm font-semibold outline-none px-3 border-l border-white/15 cursor-pointer"
              >
                {opciones.map(op => (
                  <option key={op.codigo} value={op.codigo} className="bg-blue-900">
                    {op.codigo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-white/10" />

        {/* Botón */}
        <button
          type="submit"
          className="w-full py-3.5 bg-white text-blue-700 text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-blue-50 active:scale-95 transition"
        >
          Convertir
        </button>

        {/* Tasa */}
        <p className="text-center text-white/40 text-xs">
          {tasa || 'Tasas actualizadas en tiempo real'}
        </p>
      </form>
    </div>
  );
}

export default App;