import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Header from './components/Header'
import Order from './Pages/Order'
import store from './store'
import { Provider } from 'react-redux'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Feedback from './Pages/Feedback'
import Contact from './Pages/Contact'
import MyOrder from './Pages/MyOrder'
import SuccessPage from './Pages/Success'
import Settings from './Pages/Settings'
import AdminPage from './Pages/AdminPage'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <Router>
    <div>
     <Layout> 
       
      <Routes>
         
        <Route path='/' element={<Home />}></Route>
         <Route path='/order/:id' element={<Order />}></Route>
              <Route path='/Cart' element={<Cart />}></Route>
               <Route path='/Login' element={<Login />}></Route>
                <Route path='/Signup' element={<Signup />}></Route>
                <Route path='/Feedback' element={<Feedback />}></Route>
                <Route path='/Contact' element={<Contact />}></Route>
                <Route path='/MyOrder' element={<MyOrder />}></Route>
                <Route path='/SuccessPage' element={<SuccessPage />}></Route>
                 <Route path='/Settings' element={<Settings />}></Route>
                        <Route path='/AdminPage' element={<AdminPage />}></Route>
      </Routes>
      </Layout>
    </div>
    </Router>
    </Provider>
  )
}
