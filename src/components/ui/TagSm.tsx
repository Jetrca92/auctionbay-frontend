import styles from 'styles/scss/Ui.module.scss'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode | ReactNode[]
}

const TagSm: FC<Props> = ({ children }) => {
  let backgroundColor = ''
  let color = '#071015'

  if (typeof children === 'string') {
    if (children.toLowerCase().includes('eur')) {
      backgroundColor = '#272D2D'
      color = '#FFFFFF'
    } else {
      switch (children.toLowerCase()) {
        case 'outbid':
          backgroundColor = '#FFAA98'
          break
        case 'winning':
        case 'won':
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
  }

  return (
    <div className={styles.tag} style={{ backgroundColor }}>
      <div className={styles.tagTextSm} style={{ color }}>
        {children}
      </div>
    </div>
  )
}

export default TagSm
