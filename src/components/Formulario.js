import React,{useEffect,useState} from 'react';
import styled from '@emotion/styled'
import axios from 'axios';
import PropType from 'prop-types';
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import Error from './Error'



const Boton =styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#FFFFFF;
    transition:background-color .3s ease;
    &:hover{
        background-color:#326ac0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    //state del listado de criptomonedas
    const [listacripto,guardarCriptomonedas]=useState([]);
    const [error,guardarError]=useState(false);

    const MONEDAS = [
        {codigo:'USD',nombre:'Dolar de Estados Unidos'},
        {codigo:'CLP',nombre:'Peso Chileno'},
        {codigo:'MXN',nombre:'PESO Mexicano'},
        {codigo:'EUR',nombre:'Euro'}

    ]

    //Utilizar UseMoneda
    const [moneda,SelectMoneda]=useMoneda('Elige tu Moneda','',MONEDAS);

   //utilizar useCriptoMoneda

   const[criptomoneda,SelectCripto] = useCriptomoneda('Elige tu cripto Moneda','',listacripto)
   //Ejecutar LLamado a la Api
   useEffect(()=>{
    const consultarApi = async () => {
        const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=CLP'
        const resultado = await axios.get(url)
        guardarCriptomonedas(resultado.data.Data)
    }
    consultarApi()
   },[])

   //Cuando el usuario hace submit
   const cotizarMoneda = e =>{
       e.preventDefault();

       //Validar si ambos campos estan llenos
       if(moneda === ''|| criptomoneda ===""){
           guardarError(true)
           return;
       }

       guardarMoneda(moneda)
       guardarCriptomoneda(criptomoneda)
        // Pasar los datos al componente Principal
       guardarError(false)
   }

    return ( 
        <form
            onSubmit ={cotizarMoneda}
        >
            {error ? <Error mensaje="hay un error Todos Los campos Son Obligatorios"/> : null}
            <SelectMoneda/>
            <SelectCripto/>

            <Boton
                type="submit"
                value="calcular"
            />
        </form>
     );
}

Formulario.prototype ={
    guardarMoneda:PropType.func.isRequired,
    guardarCriptomoneda:PropType.func.isRequired
}
export default Formulario;