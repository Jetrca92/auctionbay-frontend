import { FC } from 'react'
import styles from 'styles/scss/Auction.module.scss'
import Tag from 'components/ui/Tag'
import TimeTag from 'components/ui/TimeTag'
import { AuctionType, calculateHoursLeft } from 'models/auction'
import NewBidForm from 'components/bids/NewBidForm'
import noImage from 'styles/images/empty-image.png'
import { BidType } from 'models/bid'
import BiddingHistoryTable from 'components/bids/BiddingHistoryTable'

interface AuctionCardProps {
  auction: AuctionType
}

const AuctionContent: FC<AuctionCardProps> = ({ auction }) => {
  if (!auction) {
    return <p>Loading...</p>
  }
  const bids = auction.bids || []
  let sortedBids: BidType[] = []
  if (bids.length > 0) {
    sortedBids = bids.sort((a, b) => {
      return Number(new Date(b.created_at)) - Number(new Date(a.created_at))
    })
  }
  return (
    <div className={styles.auctionContent}>
      <div className={styles.innerContainer}>
        {auction &&
          (auction.image ? (
            <img
              src={auction.image}
              className={styles.image}
              alt="auctionImage"
            />
          ) : (
            <img src={noImage} className={styles.image} alt="noImage" />
          ))}
        <div className={styles.rightSide}>
          <div className={styles.detailsCard}>
            <div className={styles.innerDetailsCard}>
              <div className={styles.metaBar}>
                <Tag>Outbid</Tag>
                <TimeTag>{calculateHoursLeft(auction)}</TimeTag>
              </div>
              <h1 className={styles.title}>{auction.title}</h1>
              <div className={styles.description}>{auction.description}</div>
              <div className={styles.bidBar}>
                <div className={styles.bidBarTab}>
                  <button className={styles.bidTabButton}>Bid</button>
                  <button className={styles.autoBidTabButton} disabled>
                    Auto bid
                  </button>
                </div>
              </div>
              <NewBidForm auction={auction} />
            </div>
          </div>
          <div className={styles.biddingHistory}>
            {bids.length > 0 ? (
              <>
                <div>
                  <h4 className={styles.biddingHistoryTitle}>
                    Bidding history ({bids.length})
                  </h4>
                </div>
                {sortedBids.map((bid: BidType, index: number) => (
                  <BiddingHistoryTable
                    bid={bid}
                    auction={auction}
                    key={index}
                  />
                ))}
              </>
            ) : (
              <div className={styles.emptyContainer}>
                <div className={styles.emptyState}>
                  <div className={styles.captionTitle}>
                    <h5 className={styles.captionTitleText}>No bids yet!</h5>
                  </div>
                  <div className={styles.caption}>
                    Place your bid to have a chance to get this item.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionContent
