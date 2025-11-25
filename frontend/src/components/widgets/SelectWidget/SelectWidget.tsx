import style from './SelectWidget.module.css'
import { Option } from '../../ui/Option/Option'
import clsx from 'clsx'

export interface SelectWidgetProps {
  selectedMode: boolean
  selectedAds: number[]
  onChange: (selectedMode: boolean) => void
  children?: React.ReactNode
}

export const SelectWidget = ({
  selectedMode,
  selectedAds,
  onChange,
  children,
}: SelectWidgetProps) => {
  return (
    <div
      className={clsx(
        style.selectedArea,
        selectedMode && style.choosenSelectedArea,
        selectedAds.length > 0 && selectedMode && style.selectedSomeOne
      )}
    >
      <Option
        checked={selectedMode}
        onChange={onChange}
        title={
          selectedMode ? `выбрано: ${selectedAds.length}` : 'выбрать несколько'
        }
      ></Option>
      {selectedMode && selectedAds.length > 0 && (
        <div className={style.operations}>{children}</div>
      )}
    </div>
  )
}
