// On importe les outils de react-router-dom pour gérer la navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// On importe nos pages
import Home from './pages/Home'
import Products from './pages/Products'

function App() {
  return (
    // BrowserRouter active la navigation dans toute l'application
    <BrowserRouter>
      <Routes>
        {/* Quand l'URL est "/", on affiche la page Home */}
        <Route path="/" element={<Home />} />

        {/* Quand l'URL est "/products", on affiche la page Products */}
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App