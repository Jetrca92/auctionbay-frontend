import Layout from 'components/ui/Layout'
import { FC } from 'react'
import ProfilePageLayout from 'components/profile/ProfilePageLayout'
import BiddingComponent from 'components/profile/BiddingComponent'

const Bidding: FC = () => {
  return (
    <Layout>
      <ProfilePageLayout>
        <BiddingComponent />
      </ProfilePageLayout>
    </Layout>
  )
}

export default Bidding
