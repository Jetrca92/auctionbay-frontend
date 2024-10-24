import AuctionsBody from 'components/auctions/AuctionsBody'
import TitleComponent from 'components/auctions/TitleComponent'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import styles from 'styles/scss/Auctions.module.scss'

const Auctions: FC = () => {
  return (
    <Layout>
      <div className={styles.auctionsBody}>
        <TitleComponent />
        <AuctionsBody />
      </div>
    </Layout>
  )
}

export default Auctions
