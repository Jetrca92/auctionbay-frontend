import AuctionContent from 'components/auctions/AuctionContent'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const Auction: FC = () => {
  const location = useLocation()
  const auction = location.state?.auction || location.state?.newAuction

  return (
    <Layout>
      {auction ? (
        <AuctionContent auction={auction} />
      ) : (
        <p>No auction data available</p>
      )}
    </Layout>
  )
}

export default Auction
