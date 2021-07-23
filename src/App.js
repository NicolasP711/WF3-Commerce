import { Fragment, useEffect, useState } from 'react'
import { useStorageState } from 'react-storage-hooks'
import Header from './components/header/Header'
import Banner from './components/banner/Banner'
import { Container } from 'react-bootstrap'
import Home from './pages/home/Home'
import { Switch, Route, useLocation } from 'react-router-dom'
import SinglePage from './pages/single-page/SinglePage'
import { auth, db } from './firebase'
import LoginPage from './pages/login-page/LoginPage'
import AdminPage from './pages/admin-page/AdminPage'
import BasketPage from './pages/home/basket-page/BasketPage'

const useItems = () => {
  const [items, setItems] = useStorageState(localStorage, 'firebase-items', [])
  useEffect(() => {
    db.collection('items').onSnapshot(snap => {
      /** docs.map = firebase */
      const allItems = snap.docs.map(doc => ({...doc.data(), id: doc.id}))
      setItems(allItems)
    })

  }, [setItems])

  return items
}

const useUser = () => {
  const [user, setUser] = useStorageState(localStorage, 'firebase-user', null)
  useEffect(() => {
    auth.onAuthStateChanged(connectedUser => {
      if (connectedUser) {
        db.collection('users')
        .where('email', '==', connectedUser.email)
        .get()
        .then(result => {
          result.forEach(doc => setUser(doc.data()))
        })
      }
      else setUser(null)
    })
  }, [setUser])
  return user
}

const App = () => {
  const [basket, setBasket] = useState([])
  const items = useItems()
  const user = useUser()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const deleteItem = (id) => {
    setBasket(basket.filter(item => item.id !== id))
  }

  const addItem = item => {
    const exist = basket.find(article => article.id === item.id)
    if(exist){
      setBasket(basket.map(article => article.id === exist.id ? {...exist, qty: exist.qty + 1} : article))
    } else setBasket([...basket, {...item, qty: 1 }])
  }

  const subItem = (item) => {
    if (item.qty === 1) {
      deleteItem(item.id)
    } else {
      setBasket(
        basket.map(article => article.id === item.id ? {...item, qty: item.qty - 1} : article)
      )
    }
  }

  return (
    <Fragment>
      <Header user={user} basket={basket} />
      {isHome && <Banner />}
      <Container style={{ marginTop: isHome ? '200px' : '100px' }}>
        <Switch>
          <Route exact path='/'>
            <Home list={items} />
          </Route>
          <Route path='/item/:id'>
            <SinglePage list={items} addItem={addItem} />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/admin'>
            <AdminPage list={items} user={user} />
          </Route>
          <Route exact path='/basket'>
            <BasketPage basket={basket} deleteItem={deleteItem} subItem={subItem} addItem={addItem} />
          </Route>
        </Switch>
      </Container>
    </Fragment>
  )
}

export default App
