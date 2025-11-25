import { SingleSelectDropdown } from '../../ui/SingleSelectDropdown/SingleSelectDropdown'
import type { Category } from '../../../types/app/ads'

export interface SelectCategoryDropdownProps {
  categories: Category[]
  onChangeCategory: (categoryId: number | null) => void
  initialCategory: number | null
}

export const SelectCategoryDropdown = (props: SelectCategoryDropdownProps) => {
  const { categories, onChangeCategory, initialCategory } = props

  const options = categories.map((category) => category.name)

  const handleChangeCategory = (category: string | null) => {
    if (!category) {
      onChangeCategory(null)
    }
    const id = categories.find((catObj) => catObj.name == category)?.id
    if (id) {
      onChangeCategory(id)
    }
  }

  return (
    <SingleSelectDropdown
      placeholder="Категория"
      options={options}
      onChange={handleChangeCategory}
      initialSelected={
        categories.find((cat) => cat.id === initialCategory)?.name || null
      }
    ></SingleSelectDropdown>
  )
}
