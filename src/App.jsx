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
      console.log('я удаляю одни и те же id:', id)
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


  let [calculatePrice, setCalculatePrice] = useState([0])

  const calculateSum = (price) => {
    setCalculatePrice(prev => Number(prev) + Number(price))
    // console.log(Number(calculatePrice) + Number(price))
    // console.log(Number(calculatePrice))
  }


  return (
    <AppContext.Provider value={{ cartItems, value, isLoading, value, sneakers, onAddToCart,  favorites, onClickFavorites, deleteCheckedButtonIntoMainPage, setCartOpened, deleteCheckedButtonFromOrderPage, /* */ calculateSum, calculatePrice, setCalculatePrice }}>
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
