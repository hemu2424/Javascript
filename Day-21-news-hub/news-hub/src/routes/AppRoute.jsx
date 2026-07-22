import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Category from '../pages/Category'
import Search from '../pages/Search'
import ArticleDetails from '../pages/ArticleDetails'
import Bookmarks from '../pages/Bookmarks'
import NotFound from '../pages/NotFound'
import About from '../pages/About'

const AppRoute = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:category" element={<Category />} />
          <Route path="search" element={<Search />} />
          <Route path="article" element={<ArticleDetails />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRoute
