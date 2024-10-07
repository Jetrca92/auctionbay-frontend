import { FC } from 'react'
import styles from 'styles/scss/Auctions.module.scss'
import AuctionCard from './AuctionCard'
import { AuctionType } from 'models/auction'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'

const AuctionsBody: FC = () => {
  const { data, isLoading } = useQuery(
    ['fetchAuctions'],
    () => API.fetchActiveAuctions(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  if (isLoading) {
    return (
      <div className={styles.emptyBody}>
        <div className={styles.emptyStateContainer}>
          <div className={styles.caption}>Loading auctions ...</div>
        </div>
      </div>
    )
  }

  if (data?.data.length === 0)
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
      {data?.data.map((auction: AuctionType, index: number) => (
        <Link
          key={index}
          className={'auctionCardLink'}
          to={`${routes.AUCTION_PREFIX}/${auction.id}`}
          state={{ auction }}
        >
          <AuctionCard auction={auction} />
        </Link>
      ))}
    </div>
  )
}

export default AuctionsBody
