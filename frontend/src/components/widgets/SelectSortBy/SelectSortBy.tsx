import { SingleSelectDropdown } from '../../ui/SingleSelectDropdown/SingleSelectDropdown'

export interface SelectSortByDropdownProps {
  sorts: {
    title: string
    key: string
  }[]
  onSet: (key: string | null) => void
  initialSortKey: string | null
}

export const SelectSortByDropdown = (props: SelectSortByDropdownProps) => {
  const { sorts, onSet, initialSortKey } = props

  const options = sorts.map((sort) => sort.title)

  const handleChange = (title: string | null) => {
    if (!title) {
      onSet(null)
    }
    const findedKey = sorts.find((sort) => sort.title === title)?.key
    if (findedKey) {
      onSet(findedKey)
    }
  }

  const initialTitle =
    sorts.find((sort) => sort.key === initialSortKey)?.title || null

  return (
    <SingleSelectDropdown
      options={options}
      initialSelected={initialTitle}
      onChange={handleChange}
      placeholder={`сортировать по: ${initialTitle || ''}`}
    ></SingleSelectDropdown>
  )
}
