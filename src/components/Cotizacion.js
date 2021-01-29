import React from 'react';
import styled from "@emotion/styled"
import PropType from 'prop-types';


const ResultadoDiv = styled.div `
    color:#ffffff;
    font-family:Arial, Helvetica, sans-serif;
`
const Info = styled.p `
    font-size:18px;
    span{
        font-weight:bold;
    }
`
const Precio = styled.p `
    font-size:30px;
    span{
        font-weight:bold;
    }
`
 
const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;
    return ( 
        <ResultadoDiv>
                <Precio>El Precio es: <span>{resultado.PRICE}</span></Precio>
                <Info>El Precio mas alto del dia: <span>{resultado.HIGHDAY}</span></Info>
                <Info>El Precio mas bajo del dia: <span>{resultado.LOWDAY}</span></Info>
                <Info>Variacion ultimas 24 Horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
                <Info>Ultima Actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
 
Cotizacion.prototype ={
    resultado:PropType.string.isRequired
}
export default Cotizacion;