import './App.css'
import { ContextProvider } from './components/context'
import Home from './pages/Home'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/product/:slug' element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
