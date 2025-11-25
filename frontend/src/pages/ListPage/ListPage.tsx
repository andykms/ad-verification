import { useState } from 'react'
import style from './ListPage.module.css'
import { SearchInput } from '../../components/ui/SearchInput/SearchInput'
import { RangeSlider } from '../../components/ui/RangeSlider/RangeSlider'
import { Button } from '../../components/ui/Button/Button'
import { CardGallery } from '../../components/widgets/Gallery/Gallery'
import type { ProductCardProps } from '../../components/ui/Card/Card'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { SelectCategoryDropdown } from '../../components/widgets/SelectCategory/SelectCategory'
import type { Category } from '../../types/app/ads'
import { SelectStatusDropdown } from '../../components/widgets/SelectStatus/SelectStatus'
import { SelectSortByDropdown } from '../../components/widgets/SelectSortBy/SelectSortBy'
import { SelectWidget } from '../../components/widgets/SelectWidget/SelectWidget'
import { ModalReject } from '../../components/widgets/ModalReject/ModalReject'
import { NavLink } from 'react-router-dom'
import { StatisticButton } from '../../components/widgets/StatisticButton/StatisticButton'
import { SettingsButton } from '../../components/ui/SettingsButton/SettingsButton'
import { HomeButton } from '../../components/ui/HomeButton/HomeButton'

export interface Options {
  name: string
  isSelected: boolean
}

export interface ListPageProps {
  onSetStatus: (status: string[]) => void
  onSetCategory: (category: number | null) => void
  onSetCostRange: (min: number | null, max: number | null) => void
  onSetSearch: (search: string) => void
  onSetSortBy: (sortBy: string | null) => void
  sortByOptions: { title: string; key: string }[]
  initialSortBy: string | null
  initialCategory: number | null
  statuses: { title: string; key: string }[]
  selectedStatuses: string[] | null
  categories: Category[]
  minPossiblePrice: number
  maxPossiblePrice: number
  minPrice: number | null
  maxPrice: number | null
  products: ProductCardProps[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  onBulkApprove: (ids: number[]) => void
  onBulkReject: (ids: number[], reason: string, comment: string) => void
  onSetReset: () => void
}

export const ListPage = (props: ListPageProps) => {
  const {
    onSetStatus,
    onSetCategory,
    onSetCostRange,
    onSetSearch,
    minPossiblePrice,
    maxPossiblePrice,
    maxPrice,
    minPrice,
    statuses,
    selectedStatuses,
    categories,
    products,
    currentPage,
    totalPages,
    onPageChange,
    initialSortBy,
    sortByOptions,
    initialCategory,
    totalItems,
    onSetSortBy,
    onBulkApprove,
    onBulkReject,
    onSetReset,
  } = props

  const [openRejectReason, setOpenRejectReason] = useState<boolean>(false)

  const [selectedMode, setSelectedMode] = useState<boolean>(false)

  const [selectedAds, setSelectedAds] = useState<number[]>([])

  const [choosenStatuses, setStatuses] = useState<string[]>(
    selectedStatuses || []
  )

  const [choosenCategory, setCategory] = useState<number | null>(
    initialCategory || null
  )
  const [choosenSorted, setSorted] = useState<string | null>(initialSortBy)

  const [choosenMinPrice, setMinPrice] = useState<number>(
    minPrice || minPossiblePrice
  )
  const [choosenMaxPrice, setMaxPrice] = useState<number>(
    maxPrice || maxPossiblePrice
  )

  const handleAddStatusChange = (status: string) => {
    setStatuses([...choosenStatuses, status])
  }

  const handleRemoveStatusChange = (status: string) => {
    const newStatuses = choosenStatuses.filter((s) => s !== status)
    setStatuses(newStatuses)
  }

  const handleAddCategoryChange = (category: number | null) => {
    setCategory(category)
  }

  const handleMinPriceChange = (min: number) => {
    setMinPrice(min)
  }

  const handleMaxPriceChange = (max: number) => {
    setMaxPrice(max)
  }

  const onSubmit = () => {
    onSetStatus(choosenStatuses)
    onSetCategory(choosenCategory!)

    let validMinPrice =
      choosenMinPrice && choosenMinPrice >= minPossiblePrice
        ? choosenMinPrice
        : minPossiblePrice
    let validMaxPrice =
      choosenMaxPrice && choosenMaxPrice <= maxPossiblePrice
        ? choosenMaxPrice
        : maxPossiblePrice
    if (validMinPrice > validMaxPrice) {
      validMaxPrice = Math.min(validMinPrice + 100, maxPossiblePrice)
    }
    setMinPrice(validMinPrice)
    setMaxPrice(validMaxPrice)

    onSetCostRange(validMinPrice, validMaxPrice)
    onSetSortBy(choosenSorted)
    onPageChange(1)
  }

  const onReset = () => {
    setStatuses([])
    setCategory(null)
    setSorted(null)
    setMinPrice(minPossiblePrice)
    setMaxPrice(maxPossiblePrice)

    onSetReset()
  }

  const handleSortByChange = (sortBy: string | null) => {
    setSorted(sortBy)
  }

  const handleSelect = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedAds([...selectedAds, id])
    } else {
      setSelectedAds(selectedAds.filter((adId) => adId !== id))
    }
  }

  const handleClickApprove = () => {
    onBulkApprove(selectedAds)
    setSelectedAds([])
    setSelectedMode(false)
  }

  const handleClickDelete = () => {
    setOpenRejectReason(true)
  }

  const handleSubmitReject = (reason: string, comment: string) => {
    onBulkReject(selectedAds, reason, comment)
    setSelectedAds([])
    setSelectedMode(false)
    setOpenRejectReason(false)
  }

  return (
    <>
      <main className={style.listPage}>
        <header className={style.header}>
          <div className={style.searchArea}>
            <SearchInput onEnter={onSetSearch}></SearchInput>
          </div>
          <nav className={style.nav}>
            <NavLink to="/stats">
              <StatisticButton></StatisticButton>
            </NavLink>
            <NavLink to="/settings">
              <SettingsButton></SettingsButton>
            </NavLink>
            <NavLink to="/">
              <HomeButton></HomeButton>
            </NavLink>
          </nav>
          <article className={style.filterArea}>
            <h2 className={style.filterTitle}>Фильтры</h2>
            <div className={style.filters}>
              <SelectStatusDropdown
                statuses={statuses}
                onAddStatus={handleAddStatusChange}
                onRemoveStatus={handleRemoveStatusChange}
                choosenStatuses={choosenStatuses}
              ></SelectStatusDropdown>
              <SelectCategoryDropdown
                categories={categories}
                onChangeCategory={handleAddCategoryChange}
                initialCategory={choosenCategory}
              ></SelectCategoryDropdown>
              <SelectSortByDropdown
                sorts={sortByOptions}
                onSet={handleSortByChange}
                initialSortKey={choosenSorted}
              ></SelectSortByDropdown>
              <RangeSlider
                minValue={choosenMinPrice}
                maxValue={choosenMaxPrice}
                title="Цена"
                onChangeMax={handleMaxPriceChange}
                onChangeMin={handleMinPriceChange}
                initialMax={maxPossiblePrice}
                initialMin={minPossiblePrice}
              ></RangeSlider>
            </div>
            <div className={style.filterSelect}>
              <Button
                onClick={onSubmit}
                type="primary"
                disabled={
                  !(
                    choosenCategory ||
                    choosenSorted ||
                    choosenStatuses.length > 0 ||
                    choosenMinPrice !== minPrice ||
                    choosenMaxPrice !== maxPrice
                  )
                }
              >
                Применить
              </Button>
              <Button onClick={onReset} type="secondary">
                Сбросить
              </Button>
            </div>
          </article>
        </header>
        <CardGallery
          selectMode={selectedMode}
          onSelect={handleSelect}
          selected={selectedAds}
          cards={products}
        >
          <SelectWidget
            selectedMode={selectedMode}
            selectedAds={selectedAds}
            onChange={setSelectedMode}
          >
            <Button onClick={handleClickApprove} type="primary">
              Одобрить
            </Button>
            <Button onClick={handleClickDelete} type="danger">
              Отклонить
            </Button>
          </SelectWidget>
        </CardGallery>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          allItemsCount={totalItems}
        ></Pagination>
      </main>
      {openRejectReason && (
        <ModalReject
          onClose={() => setOpenRejectReason(false)}
          onSubmit={handleSubmitReject}
        ></ModalReject>
      )}
    </>
  )
}
