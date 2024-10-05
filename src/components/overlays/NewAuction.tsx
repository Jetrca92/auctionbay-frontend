import NewAuctionForm from 'components/auctions/NewAuctionForm'
import { FC } from 'react'
import styles from 'styles/scss/Overlays.module.scss'
import { useOverlay } from './OverlayContext'

const NewAuction: FC = () => {
  const { toggleOverlay, defaultValues } = useOverlay()
  return (
    <div className={styles.container}>
      <div className={styles.newAuctionCard}>
        <div className={styles.newAuctionCardHeader}>
          <h4>Add auction</h4>
        </div>
        <div className={styles.newAuctionCardPicture}>
          <button className={styles.addImageButton}>Add image</button>
        </div>
        <NewAuctionForm
          toggleOverlay={toggleOverlay}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  )
}

export default NewAuction
