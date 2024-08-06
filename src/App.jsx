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

  const getOrderSneakers = (cartItem) => {
    setOrderSneakers(prev => [...prev, cartItem])
  }




  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('darkTheme')
    return savedTheme === 'true'
  })

  const changeTheme = () => {
    setTheme(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem('darkTheme', theme);
    if (theme) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])


  return (
    <AppContext.Provider value={{ cartItems, value, isLoading, value, sneakers, onAddToCart,  favorites, onClickFavorites, deleteCheckedButtonIntoMainPage, setCartOpened, deleteCheckedButtonFromOrderPage, getOrderSneakers, orderSneakers, setOrderSneakers, totalSum }}>
      <div className="wrapper">
      <button className='change-theme__btn' onClick={changeTheme}>
        <svg width={35} xmlns="http://www.w3.org/2000/svg" fill={theme ? 'white' : 'rgba(0, 0, 0, 0.4)'} viewBox="0 0 24 24" stroke-width="1.5" stroke={theme ? 'white' : 'rgba(0, 0, 0, 0.4)'} class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </button>

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
