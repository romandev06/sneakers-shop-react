import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../hooks/useContextCode'
import CheckoutOrder from './CheckoutOrder'
import EmptyCart from './EmptyCart'



export default function Cart({ onRemoveItemInCart }) {
  const { cartItems, setCartOpened, deleteCheckedButtonFromOrderPage, getOrderSneakers, totalSum } = useContext(AppContext)
  const [checkout, setCheckout] = useState(false)

  const sumTax = Math.floor(totalSum * 0.05)

  const showMyOrder = (cartItem) => {
    deleteCheckedButtonFromOrderPage(cartItem.id)
    // console.log(cartItem)
    getOrderSneakers(cartItem)
  }

  const renderCartItems = () => {
    return cartItems.map(cartItem => {
      return <article className='cart-item' key={cartItem.id}>
          <img width={70} height={70} src={`img/sneakers/${cartItem.img}.png`} alt="liked sneakers" />
            <div className='cart-item__info'>
              <p>{cartItem.title}</p>
              <h3>{cartItem.price} руб.</h3>
            </div>
          <button onClick={() => onRemoveItemInCart(cartItem.id)} className='remove-item-btn'>
            <img src="img/remove-item-btn.svg" alt="" />
          </button>
          {checkout && showMyOrder(cartItem)}
        </article>
    }) 
  }


  const renderCartResult = () => {
    return <section className='cart-result__section'>
    <div className='cart-result1'>
      <p>Итого: </p>
      <div className='cart-result__line'></div>
      <strong>{totalSum} руб.</strong>
    </div>
    <div className='cart-result2'>
      <p>Налог 5%: </p>
      <div className='cart-result__line'></div>
      <strong>{sumTax} руб.</strong>
    </div>
      <button onClick={() => setCheckout(true)} className='get-order'>
        <p>Оформить заказ</p>
        <img src="img/arrow.svg" alt="arrow icon" />
      </button>
  </section>
  }


    return (
        <div className="overlay-aside">
        <aside className="cart">
          <div className='close-cart'>
            <h2>Корзина</h2>
            <button onClick={() => setCartOpened(false)} className='remove-item-btn close-cart__btn'><img src="img/remove-item-btn.svg" alt="" /></button>
          </div>

          <section className='cart-item__section'>
            {cartItems.length > 0 ? renderCartItems() : <EmptyCart />}
            {/* {checkout ? null : cartItems.length > 0 ? renderCartItems() : <EmptyCart />} */}
          </section>

          {checkout ? <CheckoutOrder /> : cartItems.length > 0 && renderCartResult() }
        </aside>
      </div>
    )
}
