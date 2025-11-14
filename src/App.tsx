import './App.css'
import { ContextProvider } from './components/context'
import Home from './pages/Home'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
import Footer from './components/Footer'
import Cart from './pages/Cart'

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/product/:slug' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
