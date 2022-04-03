import React from "react";
import { useHistory } from "react-router-dom";
import CardBuy from "./cardBuy";
import '../STYLES/playstore.css'
import coins1 from '../IMG/coins1.svg'
import coins2 from '../IMG/coins2.svg'
import coins3 from '../IMG/coins3.svg'
import coins4 from '../IMG/coins4.svg'
import coins5 from '../IMG/coins5.svg'


function PlayStore() {

    const history = useHistory()

    function volverHome(){
        history.push('/home')
    }

    return (
        <div className="containerPlayStore">
            <button onClick={volverHome} className="btnVolverTienda" type="button">Volver</button>
            <h1>Comprar Monedas</h1>
            <div className="containerCardsBuy">
                <CardBuy
                    img={coins1} 
                    monedas={500}
                    precio={500.00}
                    referencia={'500pesos'}
                />
                <CardBuy
                    img={coins2} 
                    monedas={1000}
                    precio={1000.00}
                    referencia={'1000pesos'}
                />
                <CardBuy
                    img={coins3} 
                    monedas={2500}
                    precio={2500.00}
                    referencia={'2500pesos'}
                />
                <CardBuy
                    img={coins4} 
                    monedas={5000}
                    precio={5000.00}
                    referencia={'5000pesos'}
                />
                <CardBuy
                    img={coins5} 
                    monedas={10000}
                    precio={10000.00}
                    referencia={'10000pesos'}
                />
            </div>
        </div>
    )
}
 

export default PlayStore;