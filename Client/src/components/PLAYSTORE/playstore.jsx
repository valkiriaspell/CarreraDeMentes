import React from "react";
import CardBuy from "./cardBuy";
import '../STYLES/playstore.css'


function PlayStore() {
    return (
        <div className="containerPlayStore">
            <h1>Comprar Monedas</h1>
            <div className="containerCardsBuy">
                <CardBuy 
                    monedas={500}
                    precio={500.00}
                    referencia={'500pesos'}
                />
                <CardBuy 
                    monedas={1000}
                    precio={1000.00}
                    referencia={'1000pesos'}
                />
                <CardBuy 
                    monedas={2500}
                    precio={2500.00}
                    referencia={'2500pesos'}
                />
                <CardBuy 
                    monedas={5000}
                    precio={5000.00}
                    referencia={'5000pesos'}
                />
                <CardBuy 
                    monedas={10000}
                    precio={10000.00}
                    referencia={'10000pesos'}
                />
            </div>
        </div>
    )
}
 

export default PlayStore;