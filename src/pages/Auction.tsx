import AuctionContent from 'components/auctions/AuctionContent'
import Layout from 'components/ui/Layout'
import { AuctionType } from 'models/auction'
import { FC } from 'react'
import chair from 'styles/images/chair.png'

const auction: AuctionType = {
  id: '614bda32-bb0d-487c-b766-0eccce756b9c',
  created_at: new Date(),
  title: 'Vintage Chair',
  image: chair,
  description: 'This is a description for Vintage Chair auction.',
  starting_price: 100,
  end_date: '24',
  is_active: true,
  owner: {
    id: '123',
    username: 'joza',
  },
  bids: [],
}

const Auction: FC = () => {
  return (
    <Layout>
      <AuctionContent auction={auction} />
    </Layout>
  )
}

export default Auction
