import { MultiSelectDropdown } from '../../ui/MultiSelectDropdown/MultiSelectDropdown'

export interface SelectStatusDropdownProps {
  statuses: {
    title: string
    key: string
  }[]
  choosenStatuses: string[]
  onAddStatus: (key: string) => void
  onRemoveStatus: (key: string) => void
}

export const SelectStatusDropdown = (props: SelectStatusDropdownProps) => {
  const { statuses, onAddStatus, onRemoveStatus, choosenStatuses } = props

  const handleAddStatus = (title: string) => {
    const findedKey = statuses.find((status) => status.title === title)?.key
    if (findedKey) {
      onAddStatus(findedKey)
    }
  }

  const handleRemoveStatus = (title: string) => {
    const findedKey = statuses.find((status) => status.title === title)?.key
    if (findedKey) {
      onRemoveStatus(findedKey)
    }
  }

  return (
    <MultiSelectDropdown
      title="статус"
      options={statuses.map((status) => ({
        name: status.title,
        isSelected: choosenStatuses.includes(status.key),
      }))}
      onSelect={handleAddStatus}
      onUnselect={handleRemoveStatus}
    ></MultiSelectDropdown>
  )
}
