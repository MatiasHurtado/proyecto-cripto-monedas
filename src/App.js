import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div `
  max-width:900px;
  margin:0 auto;
  @media(min-width:992px){
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    column-gap:2rem;
    
  }
`
const Imagen = styled.img`
  max-width: 100%;
  margin-top:5rem;

`
const Heading = styled.h1 `
  font-family:'Bebas Neue',cursive;
  color:#ffffff;
  text-align:left;
  font-weight:700;
  font-size:50px;
  margin-bottom:50px;
  margin-top:80px;

  &::after{
     content:'';
     width:100px;
     height:6px;
     background-color:#66A2FE;
     display:block;

  }
`

function App() {

  const [moneda,guardarMoneda]=useState('')
  const [criptomoneda,guardarCriptomoneda]=useState('')
  const [resultado,guardarResultado] = useState({})
  const [cargando,guardarCargand]=useState(false)

  useEffect(() => {

    const cotizarCriptomoneda = async()=>{
       //Evitamos la ejecucion la primera vezd
      if(moneda ==='') return;
      //Consultar la api para obtener cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //Mostrar Spinner
      guardarCargand(true)

      //ocultar el spinner y mostrar resultado

      setTimeout (()=>{
        guardarCargand(false)
        //GUARDAR COTIZACION
         //se agrego en el codigo cripto y moneda por que estos pasan como rutas ya que nuestros valores son codigos y la api se movia precisamente con estos ya que se mueve con codigos
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      },3000)

     
      
    }
    cotizarCriptomoneda()

  }, [moneda,criptomoneda])


  //Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner/> :<Cotizacion resultado = {resultado}/>
  return (
    
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="Imagen Crypto"
        />
      </div>
      <div>
        <Heading>Cotiza CriptoMonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
