import Hero from 'components/LandingPage.tsx/Hero'
import Navbar from 'components/ui/Navbar'
import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className="p-2 mb-4">
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home
