import styles from 'styles/scss/Ui.module.scss'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode | ReactNode[]
}

const Tag: FC<Props> = ({ children }) => {
  let backgroundColor = ''
  let color = ''

  if (typeof children === 'string') {
    switch (children.toLowerCase()) {
      case 'outbid':
        backgroundColor = '#FFAA98'
        break
      case 'winning':
        backgroundColor = '#ADFF90'
        break
      case 'in progress':
        backgroundColor = '#F9FF90'
        break
      case 'done':
        backgroundColor = '#272D2D'
        color = '#FFFFFF'
    }
  }

  return (
    <div className={styles.tag} style={{ backgroundColor }}>
      <div className={styles.tagText} style={{ color }}>
        {children}
      </div>
    </div>
  )
}

export default Tag
