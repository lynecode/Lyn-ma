// On importe useNavigate, pour changer de page au clic d'un bouton
import { useNavigate } from 'react-router-dom'

// On importe l'image du logo
import logo from '../assets/logo.png'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">

      <div className="absolute -top-16 -left-16 w-64 h-64 sm:w-80 sm:h-80 bg-[#C97B6B] rounded-full animate-float"></div>

      <div className="absolute -bottom-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#2E2A5C] rounded-full animate-float-reverse"></div>

      <div className="relative z-10 flex flex-col items-center px-6">
        <img
          src={logo}
          alt="Lynéma"
          className="w-48 sm:w-64 md:w-80 object-contain"
        />
      </div>

      {/* Au clic, on navigue vers la page /products */}
      <button
        onClick={() => navigate('/products')}
        className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-10 bg-[#E8D5D0] text-black text-sm sm:text-base px-6 py-3 rounded-full rounded-bl-none shadow-md hover:scale-105 transition-transform duration-300"
      >
        Découvrez
      </button>

    </div>
  )
}

export default Home