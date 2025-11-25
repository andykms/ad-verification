import styles from './SelectCard.module.css'
import { ProductCard, type ProductCardProps } from '../../ui/Card/Card'
import { Checkbox } from '../../ui/Checkbox/Checkbox'
import clsx from 'clsx'

export interface SelectCardProps {
  product: ProductCardProps
  onSelect: (isSelect: boolean) => void
  checked: boolean
}

export const SelectCard = (props: SelectCardProps) => {
  const { product, onSelect, checked } = props

  return (
    <div className={clsx(styles.selectCard, checked && styles.checked)}>
      <div className={styles.checkboxContainer}>
        <Checkbox onChange={onSelect} checked={checked}></Checkbox>
      </div>
      <ProductCard {...product}></ProductCard>
    </div>
  )
}
