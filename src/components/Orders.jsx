import React, { useContext } from 'react'
import { AppContext } from '../hooks/useContextCode'

export default function Orders() {
    const { orderSneakers, setOrderSneakers } = useContext(AppContext)

    // удаление конкретного элемента (вне зависимости от количества одинаковых кроссовок)
    const deleteSneakersItem = (id) => {
        setOrderSneakers(prev => {
            let indexItem = prev.findIndex(item => item.id === id)
            if (indexItem !== -1) {
                let newArr = [...prev]
                newArr.splice(indexItem, 1)
                return newArr
            }
            return prev
        })
    }

    return (
        <section className='order-section'>
            <h1>Мои покупки</h1>
            <section className='order-sneakers'>
                {orderSneakers.map(orderSneaker =>
                    <article className='sneakers-article'>
                        <button>
                            <img className='heart-unliked' src='/img/heart-unliked.svg' alt="" />
                        </button>
                        <img width={133} height={112} src={`/img/sneakers/${orderSneaker.img}.png`} alt="sneakers" />
                        <div>
                            <h3>{orderSneaker.title}</h3>
                            <div className='add-sneaker'>
                            <div className='price-container'>
                                <p>Цена:</p>
                                <h4>{orderSneaker.price}</h4>
                            </div>
                            <button onClick={() => deleteSneakersItem(orderSneaker.id)}>
                                <img width={30} src="img/remove-item-btn.svg" alt="" />
                            </button>
                            </div>
                        </div>
                    </article>
                )}
            </section>
        </section>
    )
}