
import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import instaicon from './assets/instaicon.png'
import LoginPage from './Components/LoginPage'
import SignUpPage from './Components/SignUpPage'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductsPage from './Components/ProductsPage'
import SingleProductPage from './Components/SingleProductPage'
import CartPage from './Components/CartPage'
import carticon from './assets/carticon.png'
import CheckoutPage from './Components/CheckoutPage'
import { Badge } from 'react-bootstrap'

function App() {
  const navigate = useNavigate();
  const [user,setUser] = useState('');
  const [cart,setCart] = useState({});
  const [screen,setScreen] = useState(
   window.width<=600,
  )
  const screenSize = () =>{
    setScreen(window.width <= 600)
  }

  useEffect(()=>{
    window.addEventListener('resize',screenSize)
    return()=>{
      window.removeEventListener('resize',screenSize)
    }
  },[])

  useEffect(() => {
    const userName = localStorage.getItem('InstaBuyEmail');
    if(userName){
      setUser(userName)
    }
  },[])

  const handleCart = (item) => {
    setCart({...cart,...item})
  }
  console.log('CArt iS ' , cart)
  return(
    <>
    <nav>
        <div className='title'>
          <img src={instaicon} alt="logo" onClick={()=>{navigate('/')}} className='Icon'/>
          <h2>InstaBuy!</h2>
        </div>
        <div className="loginButton" style={screenSize ? {display:'flex'} : {}}>
          <button style={{backgroundColor:'white',border:'none',width:'50px'}}>
          {user && 
            <img src={carticon} 
            style={{
              width:'3rem',
              height:'3rem',
              marginRight:'2rem',
              cursor:'pointer',
            }}
            onClick={()=>{
              navigate('/cart');
            }}
            alt="" />
            }
            {/* <Badge bg="success">{cart.length}</Badge> */}
          </button>
          <button onClick={()=>{
            localStorage.removeItem('InstaBuyEmail');
            navigate('/login')
            }} >{user ? 'Logout':'Login'}</button>
        </div>
    </nav>
    <Routes>
      <Route path="/" element={<HomePage user={user}/>}/>
      <Route path="/login" element={<LoginPage setUser={setUser}/>}/>
      <Route path="/signup" element={<SignUpPage setUser={setUser}/>}/>
      <Route path="/products" element={<ProductsPage />}/>
      <Route path="/products/:id" element={<SingleProductPage cart={cart} handleCart = {handleCart}/>} />
      <Route path="/cart" element={<CartPage cart={cart}/>} />
      <Route path="/checkout" element={<CheckoutPage /> }></Route>
    </Routes>
    </>
  )
}

export default App
