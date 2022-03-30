import React from 'react'
import '../STYLES/cardBuy.css'
import axios from 'axios'

function CardBuy({monedas, precio, referencia}) {

  const email = localStorage.getItem('email')

  async function handleComprar(monedas, precio, email, referencia) {
    const ordenCompra = { //orden de compra
      quantity: 1, // cantidad
      description: `${monedas} Mentecitas`, //nombre del producto
      price: precio, //precio del producto
      email: email, //email del usuario
      external_reference: referencia //referencia del producto, asi sabemos que compro para luego agregar a sus monedas en la bd
    };
    const crearPago = await axios.post('http://localhost:3001/mercadopago/create_preference', ordenCompra);
    window.open(crearPago.data.init_point, "_blank"); //abrir pestaña nueva
  }

  return (
    <div className='containerCardsB'>
        <div className='cardContent'>
            <h3>{monedas}</h3>
            <h2>Mentecitas</h2>
            <div className='btnComprar' onClick={()=> handleComprar(monedas, precio, email, referencia)}>
                <h2>Comprar</h2>
                <h3>{precio} ARS</h3>
            </div>
        </div>
    </div>
  )
}

export default CardBuy