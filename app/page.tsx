import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import SearchBar from './components/SearchBar'
import Kategoriler from './components/Kategoriler'
import NasilCalisir from './components/NasilCalisir'
import DJler from './components/DJler'
import Sayaclar from './components/Sayaclar'
import NedenBiz from './components/NedenBiz'
import Referanslar from './components/Referanslar'
import Blog from './components/Blog'
import DJolCTA from './components/DJolCTA'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <SearchBar />
      <Kategoriler />
      <NasilCalisir />
      <DJler />
      <Sayaclar />
      <NedenBiz />
      <Referanslar />
      <Blog />
      <DJolCTA />
      <Footer />
    </main>
  )
}