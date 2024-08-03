import React, { memo } from 'react'

export default memo(function Orders({ orderSneakers = [] }) {
    return (
        <section className='order-section'>
            <h1>Мои покупки</h1>

            {orderSneakers.map(orderSneaker => 
                <article className='sneakers-article'>
                    <img width={133} height={112} src={`/img/sneakers/${orderSneaker.img}.png`} alt="sneakers" />
                    <div>
                        <h3>{orderSneaker.title}</h3>
                        <div className='add-sneaker'>
                        <div className='price-container'>
                            <p>Цена:</p>
                            <h4>{orderSneaker.price}</h4>
                        </div>
                        </div>
                    </div>
                </article>
            )}
        </section>
    )
})