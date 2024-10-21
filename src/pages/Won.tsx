import Layout from 'components/ui/Layout'
import { FC } from 'react'
import ProfilePageLayout from 'components/profile/ProfilePageLayout'
import WonComponent from 'components/profile/WonComponent'

const Won: FC = () => {
  return (
    <Layout>
      <ProfilePageLayout>
        <WonComponent />
      </ProfilePageLayout>
    </Layout>
  )
}

export default Won
