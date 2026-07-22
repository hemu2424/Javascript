import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <Navbar/>
      <main className="mx-auto min-h-[calc(100vh-9rem)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout
