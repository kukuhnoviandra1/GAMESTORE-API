import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components'
import { 
  Home, 
  UserRegister, 
  UserLogin, 
  Cart, 
  Order, 
  ProductDetails, 
  ProductAdd, 
  ProductEdit,
  LineItem,
  UserProfile,
  NotFound 
} from './pages'


function App() {
  const [login, setLogin] = useState(false);
  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  }
  const userLogin = (param) => {
    setLogin(param)
  }

  useEffect(() => {
    if(localStorage.getItem("access_token")) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [login])

  return (
    <BrowserRouter>
      <Navbar login={login} userLogin={userLogin}/>
      {
        login ?
        <div className="container-fluid">
          <Switch>
            <Route exact path ="/">
              <Home login={login}/>
            </Route>
            <Route exact path ="/cart">
              <Cart/>
            </Route>
            <Route exact path ="/line-item">
              <LineItem/>
            </Route>
            <Route exact path ="/order">
              <Order/>
            </Route>
            <Route exact path ="/products/add/">
              <ProductAdd/>
            </Route>
            <Route exact path ="/products/edit/:id">
              <ProductEdit/>
            </Route>
            <Route exact path ="/products/details/:id">
              <ProductDetails/>
            </Route>
            <Route exact path ="/user/profile/">
              <UserProfile/>
            </Route>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </div>
        :
        <div className="container-fluid">
          <Switch>
            <Route exact path ="/">
              <Home login={login}/>
            </Route>
            <Route exact path ="/users/login"> 
              <UserLogin userLogin={userLogin} getToken={getToken}/>
            </Route>
            <Route exact path ="/users/register">
              <UserRegister userLogin={userLogin} getToken={getToken}/>
            </Route> 
            <Route exact path ="/products/details/:id">
              <ProductDetails/>
            </Route>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </div>
      }
      
    </BrowserRouter>
  );
}

export default App;
