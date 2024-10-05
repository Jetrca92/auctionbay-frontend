import { FC } from 'react'
import styles from 'styles/scss/Auction.module.scss'
import Tag from 'components/ui/Tag'
import TimeTag from 'components/ui/TimeTag'
import { AuctionType, calculateHoursLeft } from 'models/auction'
import avatar from 'styles/images/Avatar.png'
import NewBidForm from 'components/bids/NewBidForm'

interface AuctionCardProps {
  auction: AuctionType // Auction prop type
}

const bids = NaN
const AuctionContent: FC<AuctionCardProps> = ({ auction }) => {
  return (
    <div className={styles.auctionContent}>
      <div className={styles.innerContainer}>
        <img src={auction.image} className={styles.image} alt="auctionImage" />
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
                  <button className={styles.autoBidTabButton}>Auto bid</button>
                </div>
              </div>
              <NewBidForm auction={auction} />
            </div>
          </div>
          <div className={styles.biddingHistory}>
            {bids ? (
              <>
                <div>
                  <h4 className={styles.biddingHistoryTitle}>
                    Bidding history (2)
                  </h4>
                </div>
                <div className={styles.biddingHistoryTable}>
                  <div className={styles.tableItem}>
                    <div className={styles.tableItemName}>
                      <img
                        src={avatar}
                        alt="avatar"
                        className={styles.avatar}
                      />
                      Bigi Smols
                    </div>
                    <div className={styles.tableItemDate}>14:31 22.6.2023</div>
                    <button className={styles.tableItemPrice}>32 €</button>
                  </div>
                </div>
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
