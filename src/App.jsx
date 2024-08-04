import { useEffect, useState } from 'react';
import './index.css'
import Header from './components/Header';
import Cart from './components/Cart';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';
import AllSneakers from './components/AllSneakers';
import Bookmarks from './components/Bookmarks';
import SearchSneakers from './components/SearchSneakers';
import Orders from './components/Orders';

// add createContext()
import { AppContext } from './hooks/useContextCode';


// https://6676e32a145714a1bd7316c8.mockapi.io/sneakers

function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [sneakers, setSneakers] = useState([])

  const [cartItems, setCartItems] = useState([])

  const [value, setValue] = useState('')


// skeleton loader sneakers

  const [isLoading, setIsLoading] = useState(true)


  const [favorites, setFavorites] = useState([])

  const onClickFavorites = (item) => {
    const comparison = favorites.some(elem => elem.id === item.id)

    if (comparison) {
      setFavorites(prev => prev.filter(elem => elem.id !== item.id))
    } else {
    setFavorites(prev => [...prev, item])
  }
}

  useEffect(() => {
    axios.get('https://6676e32a145714a1bd7316c8.mockapi.io/sneakers')
    .then(res => {
      setSneakers(res.data)
      setIsLoading(false)}
    )
    .catch(err => {
      alert('Ведутся тех работы. зайдите чуть позже')
      console.log('Error', err)
    })
  }, [])



  // удаление плюса из Sneakers.jsx (на главной странице) при удалении из корзины

  const deleteCheckedButtonIntoMainPage = (id) => cartItems.some(item => item.id === id)



  // удаление плюса из Sneakers.jsx (на странице CheckoutOrder.jsx) при прике на кнопку "Оформить заказ"

  const deleteCheckedButtonFromOrderPage = (id) => {
    const comparison = cartItems.some(item => item.id === id)

    if (comparison) {
      setCartItems(prev => prev.filter(item => item.id !== id))
      // console.log('я удаляю одни и те же id:', id)
    }
  }


  const onAddToCart = (item) => {
    const comparison = cartItems.some(elem => elem.id === item.id)

    if (comparison) {
      setCartItems(prev => prev.filter(elem => elem.id !== item.id))
    } else {
      setCartItems(prev => [...prev, item])
    }
}


  const onRemoveItemInCart = (id) => {
    const comparison = cartItems.some(item => item.id === id)

    if (comparison) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
      deleteCheckedButtonIntoMainPage(id)
    }
  }


  const totalSum = cartItems.reduce((acc, item) => acc + item.price, 0)



  const [orderSneakers, setOrderSneakers] = useState([])

  const getOrderSneakers = (item) => {
    setOrderSneakers(prev => [...prev, item])
  }


  return (
    <AppContext.Provider value={{ cartItems, value, isLoading, value, sneakers, onAddToCart,  favorites, onClickFavorites, deleteCheckedButtonIntoMainPage, setCartOpened, deleteCheckedButtonFromOrderPage, getOrderSneakers, orderSneakers, setOrderSneakers, totalSum }}>
      <div className="wrapper">
        {cartOpened && <Cart onRemoveItemInCart={(id) => onRemoveItemInCart(id)} />}

        <Routes>
          <Route path='/'
          element={
          <>
            <Header open={() => setCartOpened(true)} />
            <SearchSneakers setValue={setValue} />
            <AllSneakers onClickFavorite={(item) => onClickFavorites(item)} />
          </>
          }>
          </Route>
        </Routes>


          <Routes>
            <Route path='/favorites'
            element={
              <>
                <Header open={() => setCartOpened(true)} />
                <Bookmarks onClickFavorites={(item) => onClickFavorites(item)} />
              </>
            }>
            </Route>
          </Routes>


        <Routes>
          <Route path='/orders' element={
            <>
              <Header open={() => setCartOpened(true)} />
              <Orders />
            </>}>
          </Route>
        </Routes>

        <main className="main"></main>
      </div>
    </AppContext.Provider>
  )
}

export default App;
