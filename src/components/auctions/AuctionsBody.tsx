import { FC } from 'react'
import styles from 'styles/scss/Auctions.module.scss'
import AuctionCard from './AuctionCard'
import { AuctionType } from 'models/auction'
import chair from 'styles/images/chair.png'

const auctions: AuctionType[] = [
  {
    id: '614bda32-bb0d-487c-b766-0eccce756b9c',
    title: 'Vintage Chair',
    image: chair,
    description: 'This is a description for Vintage Chair auction.',
    starting_price: '$100',
    auction_duration_hrs: '24',
    is_active: true,
    owner: {
      id: '123',
      username: 'joza',
    },
    bids: [],
  },
]

const AuctionsBody: FC = () => {
  if (auctions.length === 0)
    return (
      <div className={styles.emptyBody}>
        <div className={styles.emptyStateContainer}>
          <div className={styles.captionTitle}>
            <h3>Oh no, no auctions yet!</h3>
          </div>
          <div className={styles.caption}>
            To add new auction click “+” button in navigation bar or wait for
            other users to add new auctions.
          </div>
        </div>
      </div>
    )
  return (
    <div className={styles.auctionsContent}>
      {auctions.map((auction, index) => (
        <AuctionCard key={index} auction={auction} />
      ))}
    </div>
  )
}

export default AuctionsBody
