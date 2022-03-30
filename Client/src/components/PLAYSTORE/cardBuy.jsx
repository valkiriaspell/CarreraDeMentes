import React from 'react'
import '../STYLES/cardBuy.css'

function CardBuy({monedas, precio}) {
  return (
    <div className='containerCardsB'>
        <div className='cardContent'>
            <h3>{monedas}</h3>
            <h2>Mentecitas</h2>
            <div className='btnComprar'>
                <h2>Comprar</h2>
                <h3>{precio} ARS</h3>
            </div>
        </div>
    </div>
  )
}

export default CardBuy