import './App.css'
import { ContextProvider } from './components/context'
import Home from './pages/Home'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/product/:slug' />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
