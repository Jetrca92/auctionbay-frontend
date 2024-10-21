import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import timeIcon from 'styles/images/time.png'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import { AuctionType, calculateHoursLeft, isUserBidding } from 'models/auction'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { userStorage } from 'utils/localStorage'
import { isUserWinning } from 'models/bid'
import noImage from 'styles/images/empty-image.png'

const BiddingComponent: FC = () => {
  const { data, isLoading } = useQuery(
    ['fetchActiveAuctions'],
    () => API.fetchActiveAuctions(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )
  const userBiddedAuctions: AuctionType[] = []
  if (data) {
    const user = userStorage.getUser()
    const allAuctions: AuctionType[] = data.data
    allAuctions.forEach((auction: AuctionType) => {
      if (isUserBidding(auction, user)) {
        userBiddedAuctions.push(auction)
      }
    })
  }

  if (isLoading) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyStateBidding}>
          <div className={styles.caption}>Loading ...</div>
        </div>
      </div>
    )
  }

  if (userBiddedAuctions.length === 0)
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyStateBidding}>
          <div className={styles.captionTitle}>
            <h3>No bidding in progress!</h3>
          </div>
          <div className={styles.caption}>
            Start bidding by finding new items you like on “Auction” page!
          </div>
        </div>
      </div>
    )

  return (
    <div className={styles.myAuctions}>
      {userBiddedAuctions.map((auction: AuctionType, index: number) => (
        <Link
          className="auctionCardLink"
          key={index}
          to={`${routes.AUCTION_PREFIX}/${auction.id}`}
          state={{ auction }}
        >
          <div className={styles.cardBidding}>
            <div className={styles.content}>
              <div className={styles.tagHeader}>
                {isUserWinning(auction) ? (
                  <div className={styles.tagWinning}>
                    <div className={styles.tagText}>Winning</div>
                  </div>
                ) : (
                  <div className={styles.tagOutbid}>
                    <div className={styles.tagText}>Outbid</div>
                  </div>
                )}
                <div className={styles.timeTag}>
                  <div>{calculateHoursLeft(auction)}h</div>
                  <div className={styles.timeIcon}>
                    <img src={timeIcon} alt="time-icon" />
                  </div>
                </div>
              </div>
              <div className={styles.titleContainer}>
                <div className={styles.titleText}>{auction.title}</div>
              </div>
              <div className={styles.price}>{auction.starting_price} €</div>
            </div>
            <div className={styles.imageContainer}>
              {auction.image ? (
                <img
                  src={`http://localhost:8080${auction.image}`}
                  alt={auction.title}
                  className={styles.image}
                />
              ) : (
                <img
                  src={noImage}
                  alt={auction.title}
                  className={styles.image}
                />
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BiddingComponent
