import Hero from 'components/LandingPage.tsx/Hero'
import MyAuctions from 'components/profile/MyAuctions'
import ProfilePageLayout from 'components/profile/ProfilePageLayout'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { userStorage } from 'utils/localStorage'

const Home: FC = () => {
  const user = userStorage.getUser()
  if (!user) {
    return (
      <Layout>
        <Hero />
      </Layout>
    )
  }
  return (
    <Layout>
      <ProfilePageLayout>
        <MyAuctions />
      </ProfilePageLayout>
    </Layout>
  )
}

export default Home
