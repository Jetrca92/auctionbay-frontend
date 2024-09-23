import Layout from 'components/ui/Layout'
import { FC } from 'react'
import ProfilePageLayout from 'components/profile/ProfilePageLayout'
import MyAuctions from 'components/profile/MyAuctions'

const Profile: FC = () => {
  return (
    <Layout>
      <ProfilePageLayout>
        <MyAuctions />
      </ProfilePageLayout>
    </Layout>
  )
}

export default Profile
