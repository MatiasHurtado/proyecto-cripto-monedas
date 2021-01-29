import React,{Fragment,useState} from 'react';
import styled from '@emotion/styled';


    const Label = styled.label`
        font-family:'Bebas Neue',cursive;
        color:#FFFFFF;
        text-transform:uppercase;
        font-weight:bold;
        font-size:2.4rem;
        margin-top:2rem;
        display:block;
    `;
    const SelectCripto = styled.select `
        width:100%;
        display:block;
        padding:1rem;
        -webkit-appearance:none;
        border-radius:10px;
        border:none;
        font-size:1.2rem;
    `

    const useCriptomoneda = (label,stateInicial,opciones) =>{


    console.log(opciones)
    //State de nuestro custom hook
    const [state,actualizarState] =useState(stateInicial)
    const Seleccionar = () =>(
        <Fragment>
            <Label>{label}</Label>
            <SelectCripto
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">Seleecione Una Moneda</option>
                {opciones.map(opcion =>(
                    <option key={opcion.CoinInfo.Id}value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option> 
                ))}
            </SelectCripto>

        </Fragment>        
    );

    //Retornar State, interfaz y funcion que modifica el state
    return[state,Seleccionar,actualizarState]

}

export default useCriptomoneda

