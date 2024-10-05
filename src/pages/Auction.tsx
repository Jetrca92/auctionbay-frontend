import AuctionContent from 'components/auctions/AuctionContent'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const Auction: FC = () => {
  const location = useLocation()
  const auction = location.state?.auction
  return (
    <Layout>
      <AuctionContent auction={auction} />
    </Layout>
  )
}

export default Auction
